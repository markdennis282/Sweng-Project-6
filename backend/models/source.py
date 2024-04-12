from pydantic import BaseModel

class NewSourceDto(BaseModel):
    name: str
    url: str
    section: str
    refresh_interval: int # in minutes

class Source(NewSourceDto):
    source_id: int
