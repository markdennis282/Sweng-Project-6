#!/bin/bash

echo "Waiting for the LLM container to perform init actions..."

sleep 15s

echo "Verifying that the LLM is downloaded..."

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"name": "openchat"}' \
    "${OLLAMA_BASE_URL}/api/pull"

echo "Starting the API server..."

uvicorn backend_api:app --host 0.0.0.0
