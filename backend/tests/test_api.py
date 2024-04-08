from fastapi.testclient import TestClient

from backend_api import app

client = TestClient(app)

chat_request_body = {
    "prompt": "query",
    "section": "section"
}

def test_chat_endpoint_should_return_response(mocker):
    mocker.patch('backend_api.query_rag', return_value="LLM response")
    response = client.post("/api/chat", json=chat_request_body)
    assert response.status_code == 200
    assert response.json() == {"response": "LLM response"}

# def test_chat_endpoint_should_return_error(mocker):
#     mocker.patch('backend_api.query_rag', side_effect=Exception("LLM Error"))
#     response = client.post("/api/chat", json=chat_request_body)
#     assert response.status_code == 500

