from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Qdrant
from qdrant_client.models import FieldCondition, Filter, FilterSelector, MatchValue, VectorParams
from qdrant_client import QdrantClient, models
import os

models_cache_dir = os.environ.get("MODELS_CACHE_DIR")
embeddings = FastEmbedEmbeddings(cache_dir=models_cache_dir, model_name="BAAI/bge-small-en-v1.5")
text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=500, chunk_overlap=200
)

qdrant_host = os.environ.get("QDRANT_HOST")
client = QdrantClient(host=qdrant_host, prefer_grpc=True)


def split_documents(documents):
    return text_splitter.split_documents(documents)

def annotate_document_with_source_id(document, source_id):
    document.metadata["source_id"] = source_id


def does_qdrant_collection_exist(collection_name: str) -> bool:
    try:
        client.get_collection(collection_name=collection_name)
    except:
        return False
    return True

def create_qdrant_collection(collection_name: str):
    client.create_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(size=384, distance=models.Distance.COSINE)
    )

def get_qdrant_store(collection_name: str):
    qdrant_store = Qdrant(
        client=client,
        collection_name=collection_name,
        embeddings=embeddings
    )
    return qdrant_store


def add_documents(collection_name: str, source_id, documents):
    for doc in documents:
        annotate_document_with_source_id(doc, source_id)
    qdrant_store = Qdrant(
        client=client,
        collection_name=collection_name,
        embeddings=embeddings
    )
    qdrant_store.add_documents(documents=documents)

def delete_documents(collection_name: str, source_id):
    client.delete(
        collection_name=collection_name,
        points_selector=FilterSelector(
            filter=Filter(
                must=[
                    FieldCondition(
                        key="metadata.source_id",
                        match=MatchValue(value=source_id),
                    )
                ]
            )
        )
    )

def update_documents(collection_name: str, source_id, documents):
    delete_documents(collection_name, source_id)
    add_documents(collection_name, source_id, documents)
