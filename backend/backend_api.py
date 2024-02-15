from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from services.llm import query_rag
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

