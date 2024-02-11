from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from services.llm import query_rag

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

@app.post("/chat/")
async def chat(input_chat : Input_Chat):
    response = await query_rag(input_chat.prompt, [])
    return {"response" : response }

@app.post("/source/")
async def source(input_source : Input_Source):
    # print(input_source.dict())
    source_dict = input_source.dict()
    url = source_dict["url"]
    source_section = source_dict["source_section"]
    refresh_interval = source_dict["refresh_interval"]
    print("URL:", url)
    print("Source Section:", source_section)
    print("Refresh Interval:", refresh_interval)
    return {"source" : "function"}


@app.post("/refresh/")
async def refresh():
    return {"refresh" : "function"}

