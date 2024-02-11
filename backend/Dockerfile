FROM ubuntu:22.04

RUN DEBIAN_FRONTEND=noninteractive \
    apt update -y && \
    apt install -y python3 python3-pip wget 

RUN DEBIAN_FRONTEND=noninteractive \
    wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb && \
    dpkg -i cuda-keyring_1.1-1_all.deb && \
    apt update -y && \
    apt install -y cuda-toolkit

RUN rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app
RUN mkdir /app/chroma_db
VOLUME /app/chroma_db
ENV CHROMA_DB_PATH="/app/chroma_db"

RUN groupadd -g 1111 user && \
    useradd -u 1111 -g 1111 -ms /bin/bash user
RUN chown -R 1111:1111 /app && \
    chmod -R 770 /app
USER user

COPY --chown=1111:1111 --chmod=770 requirements.txt .
RUN pip install -r requirements.txt

ENV LLAMA_INDEX_CACHE_DIR="/app/llama_index_cache"
COPY --chown=1111:1111 --chmod=770 ./llm/models_download.py ./llm/
RUN python3 ./llm/models_download.py

RUN CUDACXX=/usr/local/cuda/bin/nvcc \ 
    CMAKE_ARGS="-DLLAMA_CUBLAS=on -DCMAKE_CUDA_ARCHITECTURES=all" \
    FORCE_CMAKE=1 \
    pip install llama_cpp_python --no-cache-dir --force-reinstall --upgrade

COPY --chown=1111:1111 --chmod=770 . .
