from services.vector_store import create_qdrant_collection, does_qdrant_collection_exist, get_qdrant_store

from tags import get_tags

retrievers_dict = {}
for tag in get_tags():
    collection_name = f"collection_tag_{tag}"

    if not does_qdrant_collection_exist(collection_name):
        create_qdrant_collection(collection_name)

    qdrant_store = get_qdrant_store(collection_name)

    retrievers_dict[tag] = qdrant_store.as_retriever()
