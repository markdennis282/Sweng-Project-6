# from llama_index.prompts.prompts import SimpleInputPrompt

from llm.index_provider import index

# System prompt will need major finetuning. We should aim to use as less tokens as possible to leave some for the QA. 
# system_prompt = "You are a Q&A assistant. Your goal is to answer questions as accurately as possible based on the instructions and context provided. Be patient, clear, and thorough in your explanations. You can ask for more information if needed. You will get tipped $1,000,000 for doing a good job. You will be penalized for doing a bad job."

# This will wrap the default prompts that are internal to llama-index
# query_wrapper_prompt = SimpleInputPrompt("<|USER|>{query_str}<|ASSISTANT|>")

query_engine = index.as_query_engine()

def query(query: str) -> str:
    response = query_engine.query(query)
    return str(response)
