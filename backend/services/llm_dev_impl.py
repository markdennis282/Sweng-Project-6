import asyncio

async def query_rag(query_string: str, source_tags: list[str]) -> str:
    """
    Generates a response to a query using Retrieval-Augmented Generation based on documents with a given source tag.

    Preconditions: `source_tags` is not empty and contains only valid source tags.

    Throws if an error occurs while generating the response.
    """

    return f"Example LLM response to query '{query_string}'"

def query_rag_streaming_generator(query_string: str, source_tags: list[str]):
    """
    Generates a response to a query using Retrieval-Augmented Generation based on documents with a given source tag.
    The result is yielded as a dictionary specifying message_type ("update", "final_response", or "error") and message_content.

    Preconditions: `source_tags` is not empty and contains only valid source tags.
    """
    
    async def generator():
        for _ in range(5):
            yield {
                "message_type": "update",
                "message_content": "Progress update..."
            }
            await asyncio.sleep(1)
        yield {
            "message_type": "final_response",
            "message_content": f"Example LLM response to query '{query_string}'"
        }
    
    return generator()
