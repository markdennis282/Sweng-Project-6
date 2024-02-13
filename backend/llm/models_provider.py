from llama_index.embeddings import HuggingFaceEmbedding
from llama_index.llms import LlamaCPP

from llm.models_download import EMBED_MODEL_NAME, LLM_URL
from utils import get_env_as_nonnegint

llm_gpu_layers = get_env_as_nonnegint("LLM_GPU_LAYERS") or 1

embed_model = HuggingFaceEmbedding(EMBED_MODEL_NAME)

llm = LlamaCPP(
    # You can pass in the URL to a GGML model to download it automatically
    model_url=LLM_URL,
    # optionally, you can set the path to a pre-downloaded model instead of model_url
    model_path=None,
    temperature=0.1,
    max_new_tokens=256,
    # llama2 has a context window of 4096 tokens, but we set it lower to allow for some wiggle room
    context_window=3900,
    # kwargs to pass to __call__()
    generate_kwargs={},
    # kwargs to pass to __init__()
    # set to at least 1 to use GPU
    model_kwargs={"n_gpu_layers": llm_gpu_layers},
    verbose=True
)
