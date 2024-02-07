from fastapi import FastAPI
from pydantic import BaseModel

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

@app.post("/chat/")
async def chat(input_chat : Input_Chat):
    return {"chat" : "function"}

@app.post("/source/")
async def source(input_source : Input_Source):
    return {"source" : "function"}


@app.post("/refresh/")
async def refresh():
    return {"refresh" : "function"}

