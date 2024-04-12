from langchain_community.document_loaders import WebBaseLoader

from models.source import NewSourceDto, Source
from services.source_db import create_source, delete_source_info, get_source, get_sources, update_source_info
from services.vector_store import add_documents, delete_documents, split_documents, update_documents

async def load_documents_from_url(url: str):
    loader = WebBaseLoader(url)
    documents = loader.load()
    return documents

async def add_source(new_source_dto: NewSourceDto) -> None:
    """
    Adds a new document source.

    Throws if an error occurs while adding the document source.
    """

    source_id = await create_source(new_source_dto)

    data = await load_documents_from_url(new_source_dto.url)
    documents = split_documents(data)

    add_documents(
        collection_name=f"collection_tag_{new_source_dto.section}",
        source_id=source_id,
        documents=documents
    )

async def delete_source(source_id) -> None:
    source = await get_source(source_id)
    await delete_source_info(source_id)
    delete_documents(
        collection_name=f"collection_tag_{source.section}",
        source_id=source_id
    )
    
async def update_source(source: Source):
    await update_source_info(source)
    data = await load_documents_from_url(source.url)
    documents = split_documents(data)
    update_documents(
        collection_name=f"collection_tag_{source.section}",
        source_id=source.source_id,
        documents=documents
    )

async def refresh_source(source_id) -> None:
    """
    Requests to refresh all the document sources.
    Since refreshing may take a long time, this function returns without waiting for completion of the refresh.
    
    Throws if the refresh request can't be fulfilled.
    """

    source = await get_source(source_id)
    data = await load_documents_from_url(source.url)
    documents = split_documents(data)
    update_documents(
        collection_name=f"collection_tag_{source.section}",
        source_id=source_id,
        documents=documents
    )

async def refresh_all_sources() -> None:
    """
    Requests to refresh all the document sources.
    Since refreshing may take a long time, this function returns without waiting for completion of the refresh.
    
    Throws if the refresh request can't be fulfilled.
    """

    for source in await get_sources():
        data = await load_documents_from_url(source.url)
        documents = split_documents(data)
        update_documents(
            collection_name=f"collection_tag_{source.section}",
            source_id=source.source_id,
            documents=documents
        )
