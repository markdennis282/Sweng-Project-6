FROM ubuntu:22.04

RUN DEBIAN_FRONTEND=noninteractive \
    apt update -y && \
    apt install -y curl python3 python3-pip sqlite3 && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app
RUN mkdir /app/cache
VOLUME /app/cache
RUN mkdir /app/cache/models_cache
ENV MODELS_CACHE_DIR="/app/cache/models_cache"
RUN mkdir /app/cache/nltk_data
ENV NLTK_DATA="/app/cache/nltk_data"

RUN groupadd -g 1111 user && \
    useradd -u 1111 -g 1111 -ms /bin/bash user
RUN chown -R 1111:1111 /app && \
    chmod -R 770 /app
USER user

ENV PATH /home/user/.local/bin:$PATH

COPY --chown=1111:1111 --chmod=770 requirements.txt .
RUN pip install --no-deps -r requirements.txt

COPY --chown=1111:1111 --chmod=770 . .

RUN sed -i -e 's/\r$//' run_prod.sh
RUN sqlite3 documents.db \
    "CREATE TABLE documents (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp TEXT NOT NULL, content TEXT NOT NULL);"
CMD ["python3", "services/crawler/main.py"]
CMD ./run_prod.sh

EXPOSE 8000
EXPOSE 5000
