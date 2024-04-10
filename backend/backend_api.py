import json
from typing import AsyncGenerator
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from services.llm import query_rag, query_rag_streaming_generator
from services.source_management import add_source, refresh_all_sources, get_sources
from utils import is_production_mode

class Input_Chat(BaseModel):
    #body of text
    prompt: str
    #section of company
    section: str

class Input_Source(BaseModel):
    name: str
    url: str
    source_section: str
    refresh_interval: int # in minutes

class SourceFull(BaseModel):
    id: str
    name: str
    url: str
    source_section: str
    refresh_interval: int # in minutes

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

@app.post("/api/source")
async def source(input_source: Input_Source):
    await add_source(input_source.name, input_source.url, input_source.source_section, input_source.refresh_interval)
    return {"response" : "added"}

@app.get("/api/source")
async def get_source():
    sources_list = await get_sources()
    sources = []
    for source in sources_list:
        sources.append(
            SourceFull(
                id=str(source["sourceId"]),
                name=source["name"],
                url=source["url"],
                source_section=source["section"],
                refresh_interval=source["refresh_interval"]
            )
        )
    return sources

@app.post("/api/refresh/")
async def refresh():
    await refresh_all_sources()
    return {"refresh" : "function"}

