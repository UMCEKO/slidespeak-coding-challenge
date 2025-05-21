import pytest
from fastapi import FastAPI
from pydantic import ValidationError, BaseModel
from starlette.testclient import TestClient

from app.schemas.base_error import BaseError

def test_base_response_integration():
    app = FastAPI()
    client = TestClient(app)
    @app.get("/test-dummy", response_model=BaseError, response_model_exclude_unset=True)
    def test_dummy():
        return BaseError[str](
            success=True,
            message="dummy",
            detail="dummy"
        )

    response = client.get("/test-dummy")
    assert response.json() == {
        "success": True,
        "message": "dummy",
        "detail": "dummy"
    }

@pytest.mark.parametrize(
    "message, success, detail, should_fail",
    [
        ("dummy", True, "dummy", False),
        ("dummy", None, "dummy", True),
        (True, True, "dummy", True),
        (None, True, "dummy", True),
        (None, "dummy", "dummy", True),
        ("dummy", True, None, True),
        ("dummy", True, False, True),
    ]
)
def test_base_error_invalid_inputs(message, success, detail, should_fail):
    if should_fail:
        with pytest.raises(expected_exception=ValidationError):
            BaseError[str](
                message=message,
                success=success,
                detail=detail
            )
    else:
        error_body = BaseError[str](
            message=message,
            success=success,
            detail=detail
        )
        assert error_body.message == message
        assert error_body.success == success

def test_base_error_validate():
    random_obj = {"message": "dummy", "success": True, "data": None, "random": True}
    with pytest.raises(expected_exception=ValidationError):
        BaseError.model_validate(random_obj)