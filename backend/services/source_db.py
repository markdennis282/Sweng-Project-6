from models.source import NewSourceDto, Source

sources = []

async def create_source(new_source_dto: NewSourceDto):
    source_id = len(sources)
    source = Source(
        source_id=source_id,
        name=new_source_dto.name,
        url=new_source_dto.url,
        section=new_source_dto.section,
        refresh_interval=new_source_dto.refresh_interval
    )
    sources.append(source)
    return source_id

async def get_sources() -> list[Source]:
    return sources

async def get_source(source_id) -> Source | None:
    for source in sources:
        if source.source_id == source_id:
            return source

async def update_source_info(updated_source: Source):
    for i in range(len(sources)):
        if sources[i].source_id == updated_source.source_id:
            sources[i] = updated_source
            return

async def delete_source_info(source_id):
    for i in range(len(sources)):
        if sources[i].source_id == source_id:
            sources.pop(i)
            return
