from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_community.document_loaders import UnstructuredFileLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Qdrant
from qdrant_client import QdrantClient, models
import os

from tags import get_tags

models_cache_dir = os.environ.get("MODELS_CACHE_DIR")

embeddings = FastEmbedEmbeddings(cache_dir=models_cache_dir, model_name="BAAI/bge-small-en-v1.5")

loader = DirectoryLoader('./docs/', glob="**/*.md", show_progress=True, loader_cls=UnstructuredFileLoader, recursive=True)

documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=500, chunk_overlap=200
)
texts = text_splitter.split_documents(documents)

qdrant_host = os.environ.get("QDRANT_HOST")

client = QdrantClient(host=qdrant_host, prefer_grpc=True)

# there must be a better way of doing this 
def does_qdrant_collection_exist(collection_name: str) -> bool:
    try:
        client.get_collection(collection_name=collection_name)
    except:
        return False
    return True

# temporary solution for adding some documents
if not does_qdrant_collection_exist("collection_tag_tech"):
    qdrant_url = f"http://{qdrant_host}:6333"

    qdrant_store = Qdrant.from_documents(
        url=qdrant_url,
        prefer_grpc=True,
        collection_name="collection_tag_tech",
        documents=texts,
        embedding=embeddings
    )

retrievers_dict = {}
for tag in get_tags():
    collection_name = f"collection_tag_{tag}"

    if not does_qdrant_collection_exist(collection_name):
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(size=384, distance=models.Distance.COSINE)
        )

    qdrant_store = Qdrant(
        client=client,
        collection_name=collection_name,
        embeddings=embeddings
    )

    retrievers_dict[tag] = qdrant_store.as_retriever()
