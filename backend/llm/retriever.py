from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_community.document_loaders import UnstructuredFileLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Qdrant
import os

models_cache_dir = os.environ.get("MODELS_CACHE_DIR")

embeddings = FastEmbedEmbeddings(cache_dir=models_cache_dir, model_name="BAAI/bge-small-en-v1.5")

loader = DirectoryLoader('./docs/', glob="**/*.md", show_progress=True, loader_cls=UnstructuredFileLoader, recursive=True)

documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=500, chunk_overlap=200
)
texts = text_splitter.split_documents(documents)

qdrant_store = Qdrant.from_documents(
    location=":memory:", #temp memory im just using for testing purposes. not suitable for production but fine enough for demo
    collection_name="AWS_TEST",
    documents=texts,
    embedding=embeddings
)
retriever = qdrant_store.as_retriever()
