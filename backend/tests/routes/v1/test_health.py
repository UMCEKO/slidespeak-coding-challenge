from app.schemas.base_response import BaseResponse


def test_health_status(client):
    response = client.get("/v1/health")
    assert response.status_code == 200

def test_health_body(client):
    response = client.get("/v1/health")
    assert BaseResponse.model_validate(response.json())