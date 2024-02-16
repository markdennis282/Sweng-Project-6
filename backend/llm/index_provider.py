from llama_index.vector_stores import ChromaVectorStore
from llama_index import VectorStoreIndex, ServiceContext
import chromadb, os

from llm.models_provider import embed_model, llm

chroma_db_path = os.environ.get("CHROMA_DB_PATH") or "./chroma_db"
vector_db = chromadb.PersistentClient(path=chroma_db_path)
vector_db_collection_name = os.environ.get("CHROMA_DB_COLLECTION_NAME") or "default_collection"
chroma_collection = vector_db.get_or_create_collection(vector_db_collection_name)
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)

service_context = ServiceContext.from_defaults(
    chunk_size=500,
    llm=llm,
    embed_model=embed_model
)

index = VectorStoreIndex.from_vector_store(
    vector_store,
    service_context=service_context
)
