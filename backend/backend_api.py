import json
from typing import AsyncGenerator
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from services.llm import query_rag, query_rag_streaming_generator
from services.source_management import add_source, refresh_all_sources
from utils import is_production_mode

class Input_Chat(BaseModel):
    #body of text
    prompt: str
    #section of company
    section: str

class Input_Source(BaseModel):
    #URL for source
    url: str
    #section for source
    source_section: str
    #refresh interval for data crawler in minutes
    refresh_interval: int

app = FastAPI()

if not is_production_mode():
    origins = [
        "http://localhost:5173"
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE"],
        allow_headers=["*"],
    )

@app.post("/api/chat/")
async def chat(input_chat : Input_Chat):
    response = await query_rag(input_chat.prompt, [input_chat.section])
    return {"response" : response}

def sse_streaming_wrapper(request: Request, generator: AsyncGenerator):
    async def event_generator():
        async for value in generator:
            yield json.dumps(value)
            if await request.is_disconnected():
                break
    return event_generator()

@app.post("/api/chat_stream")
async def chat_stream(input_chat: Input_Chat, request: Request):
    generator = query_rag_streaming_generator(input_chat.prompt, [input_chat.section])
    return StreamingResponse(sse_streaming_wrapper(request, generator), media_type="application/json")

@app.post("/api/source/")
async def source(input_source : Input_Source):
    print("URL:", input_source.url)
    print("Source Section:", input_source.source_section)
    print("Refresh Interval:", input_source.refresh_interval)
    await add_source(input_source.url, [input_source.source_section], input_source.refresh_interval)
    return {"source" : "function"}


@app.post("/api/refresh/")
async def refresh():
    await refresh_all_sources()
    return {"refresh" : "function"}
