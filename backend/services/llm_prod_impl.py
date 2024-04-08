import pprint

from llm.workflow import compiled_workflow

async def query_rag(query_string: str, source_tags: list[str]) -> str:
    """
    Generates a response to a query using Retrieval-Augmented Generation based on documents with a given source tag.

    Preconditions: `source_tags` is not empty and contains only valid source tags.

    Throws if an error occurs while generating the response.
    """
    
    inputs = {"keys": {"question": query_string, "tags": source_tags}}
    
    for output in compiled_workflow.stream(inputs):
        for key, value in output.items():
            # Node
            pprint.pprint(f"Node '{key}':")
            # Optional: print full state at each node
            pprint.pprint(value["keys"], indent=2, width=80, depth=None)
        pprint.pprint("\n---\n")

    # Final generation
    response = value['keys']['generation']
    pprint.pprint(response)
    return response

def query_rag_streaming_generator(query_string: str, source_tags: list[str]):
    """
    Generates a response to a query using Retrieval-Augmented Generation based on documents with a given source tag.
    The result is yielded as a dictionary specifying message_type ("update", "final_response", or "error") and message_content.

    Preconditions: `source_tags` is not empty and contains only valid source tags.
    """
    
    async def generator():
        inputs = {"keys": {"question": query_string, "tags": source_tags}}

        for output in compiled_workflow.stream(inputs):
            for key, value in output.items():
                if key != "__end__":
                    yield {
                        "message_type": "update",
                        "message_content": f"Currently executing: '{key}'"
                    }
                # Node
                pprint.pprint(f"Node '{key}':")
                # Optional: print full state at each node
                pprint.pprint(value["keys"], indent=2, width=80, depth=None)
            pprint.pprint("\n---\n")

        response = value['keys']['generation']
        yield {
            "message_type": "final_response",
            "message_content": response
        }
    
    return generator()
