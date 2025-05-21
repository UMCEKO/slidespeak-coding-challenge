from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app
from app.schemas.status import TaskResult, TaskStatusEnum
from app.schemas.base_envelope import BaseEnvelope

client = TestClient(app)

def test_status_success():
    mock_result = MagicMock()
    mock_result.status = TaskStatusEnum.success.value
    mock_result.ready.return_value = True
    mock_result.failed.return_value = False
    mock_result.result = "https://example.com/converted.pdf"

    with patch("app.routes.v1.status.convert_pptx_to_pdf.AsyncResult", return_value=mock_result):
        response = client.get("/v1/status/123fakeid")

    assert response.status_code == 200
    payload = BaseEnvelope[TaskResult].model_validate(response.json())
    assert payload.success is True
    assert payload.data.status == TaskStatusEnum.success
    assert payload.data.result == "https://example.com/converted.pdf"
    assert payload.data.error is None
    assert "Successfully converted" in payload.message
