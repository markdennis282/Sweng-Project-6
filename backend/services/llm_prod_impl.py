import pprint

from llm.workflow import compiled_workflow

async def query_rag(query_string: str, source_tags: list[str]) -> str:
    """
    Generates a response to a query using Retrieval-Augmented Generation based on documents with a given source tag.

    Preconditions: `source_tags` is not empty and contains only valid source tags.

    Throws if an error occurs while generating the response.
    """
    
    inputs = {"keys": {"question": query_string}}
    
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
