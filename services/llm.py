async def query_rag(query: str, source_tags: list[str]) -> str:
    """
    Generates a response to a query using Retrieval-Augmented Generation based on documents with a given source tag.

    Preconditions: `source_tags` is not empty and contains only valid source tags.

    Throws if an error occurs while generating the response.
    """
    return "Example response from the LLM."
