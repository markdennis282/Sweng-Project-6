from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

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

#functions from other backend groups
async def add_source(url: str, tags: list[str], refresh_interval: int) -> None:
    print(url)
    pass
async def refresh_all_sources() -> None:
    print("refreshed")
    pass

@app.get("/query_rag/")
async def query_rag(query: str, sourceTags: str):
    print("Query = " + query)
    print("Source Tag = " + sourceTags)
    return "Example response from the LLM."

@app.post("/chat/")
async def chat(input_chat : Input_Chat):
    return {"chat" : "function"}

@app.post("/source/")
async def source(input_source : Input_Source):
    print("URL:", input_source.url)
    print("Source Section:", input_source.source_section)
    print("Refresh Interval:", input_source.refresh_interval)
    return {"source" : "function"}


@app.post("/refresh/")
async def refresh():
    return {"refresh" : "function"}

