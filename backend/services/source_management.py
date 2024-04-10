from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Qdrant
from langchain.text_splitter import RecursiveCharacterTextSplitter
from llm.retriever import client, embeddings

sources = [
    {
        "sourceId": 0,
        "name": "AWS docs",
        "url": "https://github.com/siagholami/aws-documentation/tree/main",
        "section": "tech",
        "refresh_interval": 30
    }
]

async def get_sources():
    return sources

async def add_source(name: str, url: str, section: str, refresh_interval: int) -> None:
    """
    Adds a new document source.

    Preconditions: `url` is a valid URL, `section` is a valid source tag, 
    `refresh_interval` is expressed in minutes.

    Throws if an error occurs while adding the document source.
    """

    sources.append({
        "sourceId": len(sources),
        "name": name,
        "url": url,
        "section": section,
        "refresh_interval": refresh_interval
    })

    loader = WebBaseLoader(url)
    data = loader.load()
    text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
            chunk_size=500, chunk_overlap=200
    )
    texts = text_splitter.split_documents(data)
    
    qdrant_store = Qdrant(
        client=client,
        collection_name=f"collection_tag_{section}",
        embeddings=embeddings
    )

    qdrant_store.add_documents(texts)

async def refresh_all_sources() -> None:
    """
    Requests to refresh all the document sources.
    Since refreshing may take a long time, this function returns without waiting for completion of the refresh.
    
    Throws if the refresh request can't be fulfilled.
    """
    pass
