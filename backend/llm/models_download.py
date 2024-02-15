# This script is intended to be run standalone during docker image build only.
# Do not import it as a module.

from llama_index.embeddings import HuggingFaceEmbedding
from llama_index.llms import LlamaCPP

EMBED_MODEL_NAME = "BAAI/bge-small-en-v1.5"
LLM_URL = "https://huggingface.co/TheBloke/Llama-2-13B-chat-GGUF/resolve/main/llama-2-13b-chat.Q4_0.gguf"
# LLM_URL = "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_0.gguf"

def main():
    """
    Downloads the models to the local llama_index cache. 
    """

    HuggingFaceEmbedding(EMBED_MODEL_NAME)
    LlamaCPP(model_url=LLM_URL)

if __name__ == "__main__":
    main()
