import sqlite3
from datetime import datetime
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_community.document_loaders import UnstructuredFileLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Qdrant
from qdrant_client import QdrantClient, models
import os


class DatabaseConnector:

    models_cache_dir = os.environ.get("MODELS_CACHE_DIR")

    embeddings = FastEmbedEmbeddings(cache_dir=models_cache_dir, model_name="BAAI/bge-small-en-v1.5")

    def store_document(self, document, collection_name):
        text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
            chunk_size=500, chunk_overlap=200
        )
        web_crawler_texts = text_splitter.split_documents(document)

        qdrant_host = os.environ.get("QDRANT_HOST")

        client = QdrantClient(host=qdrant_host, prefer_grpc=True)

        qdrant_store = Qdrant(
            client=client,
            collection_name=collection_name,
            embeddings=embeddings
        )

        qdrant_store.add_documents(web_crawler_texts)


#Testing
if __name__ == "__main__":
    db_connector = DatabaseConnector(db_type='sqlite', db_name='testingDB.db')
    db_connector.connect()
    example_document = "Sample Document Content."
    db_connector.store_document(example_document)
    db_connector.disconnect()
