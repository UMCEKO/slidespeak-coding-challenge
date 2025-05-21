import pytest
from fastapi import FastAPI
from pydantic import ValidationError, BaseModel
from starlette.testclient import TestClient
from app.schemas.base_response import BaseResponse

def test_base_response_integration():
    app = FastAPI()
    client = TestClient(app)
    @app.get("/test-dummy", response_model=BaseResponse, response_model_exclude_unset=True)
    def test_dummy():
        return BaseResponse(
            success=True,
            message="dummy",
        )

    response = client.get("/test-dummy")
    assert response.json() == {
        "success": True,
        "message": "dummy",
    }

@pytest.mark.parametrize(
    "message, success, should_fail",
    [
        ("dummy", True, False),
        ("dummy", None, True),
        (True, True, True),
        (None, True, True),
        (None, "dummy", True),
    ]
)
def test_base_response_invalid_params(message, success, should_fail):

    if should_fail:
        with pytest.raises(expected_exception=ValidationError):
            BaseResponse(
                message = message,
                success = success,
            )
    else:
        response_body = BaseResponse(
            message = message,
            success = success,
        )
        assert response_body.message == message
        assert response_body.success == success

def test_base_envelope_validate():
    random_obj = {"message": "dummy", "success": True, "data": None, "random": True}
    with pytest.raises(expected_exception=ValidationError):
        BaseResponse.model_validate(random_obj)