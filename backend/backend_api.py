import json
from typing import AsyncGenerator
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from models.source import NewSourceDto, Source
from services.llm import query_rag, query_rag_streaming_generator
from services.source_management import add_source, delete_source, refresh_all_sources, refresh_source, get_sources, update_source
from utils import is_production_mode

class Input_Chat(BaseModel):
    #body of text
    prompt: str
    #section of company
    section: str

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
async def source(input_source: NewSourceDto):
    await add_source(input_source)
    return {"response" : "added"}

@app.get("/api/source")
async def get_source() -> list[Source]:
    sources = await get_sources()
    return sources

@app.delete("/api/source/{source_id}")
async def del_source(source_id: int):
    await delete_source(source_id)
    return {"response": "deleted"}

@app.put("/api/source")
async def put_source(new_source: Source):
    await update_source(new_source)
    return {"response": "updated"}

@app.post("/api/refresh")
async def refresh():
    await refresh_all_sources()
    return {"function" : "refresh"}

@app.post("/api/refresh/{source_id}")
async def refresh(source_id: int):
    await refresh_source(source_id)
    return {"function" : "refresh"}
