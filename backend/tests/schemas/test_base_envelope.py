import pytest
from fastapi import FastAPI
from pydantic import ValidationError, BaseModel
from starlette.testclient import TestClient

from app.schemas.base_envelope import BaseEnvelope


class DummySchema(BaseModel):
    field: str

DummyResponse = BaseEnvelope[DummySchema]

def test_base_envelope_integration():
    # Dummy response schema



    # Response validation check

    app = FastAPI()
    client = TestClient(app)
    @app.get("/test-dummy", response_model=DummyResponse, response_model_exclude_unset=True)
    def test_dummy():
        return DummyResponse(
            success=True,
            message="dummy",
            data=DummySchema(
                field="dummy"
            )
        )

    response = client.get("/test-dummy")
    assert response.json() == {
        "success": True,
        "message": "dummy",
        "data": {
            "field": "dummy"
        }
    }

    # Documentation generation check

    docs_openapi = client.get("/openapi.json").json()

    docs_paths = docs_openapi["paths"]
    assert isinstance(docs_paths, dict)
    assert "/test-dummy" in docs_paths.keys()

    docs_components = docs_openapi["components"]
    assert isinstance(docs_components, dict)
    assert "schemas" in docs_components.keys()

    docs_schemas = docs_components["schemas"]
    assert isinstance(docs_schemas, dict)
    assert "BaseEnvelope_DummySchema_" in docs_schemas.keys()
    assert "DummySchema" in docs_schemas.keys()

    def check_property_type(obj: object, t: str):
        assert isinstance(obj, dict)
        assert "type" in obj.keys()
        assert obj["type"] == t

    docs_dummy_response = docs_schemas["BaseEnvelope_DummySchema_"]
    assert isinstance(docs_dummy_response, dict)
    assert "properties" in docs_dummy_response.keys()
    assert "required" in docs_dummy_response.keys()
    assert "message" in docs_dummy_response["required"]
    assert "success" in docs_dummy_response["required"]

    docs_dummy_response_properties = docs_dummy_response["properties"]
    assert isinstance(docs_dummy_response_properties, dict)
    assert "message" in docs_dummy_response_properties.keys()
    assert "success" in docs_dummy_response_properties.keys()
    assert "data" in docs_dummy_response_properties.keys()

    check_property_type(docs_dummy_response_properties["message"], "string")
    check_property_type(docs_dummy_response_properties["success"], "boolean")

    docs_data_schema = docs_dummy_response_properties["data"]
    assert isinstance(docs_data_schema, dict)
    assert {"$ref": "#/components/schemas/DummySchema"} == docs_data_schema

    docs_dummy_schema = docs_schemas["DummySchema"]
    assert isinstance(docs_dummy_response, dict)
    assert "properties" in docs_dummy_response.keys()

    docs_dummy_schema_properties = docs_dummy_schema["properties"]
    assert isinstance(docs_dummy_schema_properties, dict)
    assert "field" in docs_dummy_schema_properties.keys()

    check_property_type(docs_dummy_schema_properties["field"], "string")




def test_base_envelope_access():
    envelope = BaseEnvelope[DummySchema](
        message="dummy",
        success=True,
        data=DummySchema(
            field="dummy"
        )
    )
    assert envelope.message == "dummy"
    assert envelope.success is True
    assert envelope.model_dump() == {
        "message": "dummy",
        "data": {
            "field": "dummy"
        },
        "success": True,
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
def test_base_envelope_invalid_inputs(message, success, should_fail):

    if should_fail:
        with pytest.raises(expected_exception=ValidationError):
            BaseEnvelope[DummySchema](
                message = message,
                success = success,
                data = DummySchema(
                    field="dummy"
                )
            )
    else:
        envelope = BaseEnvelope[DummySchema](
            message = message,
            success = success,
            data = DummySchema(
                field="dummy"
            )
        )
        assert envelope.message == message
        assert envelope.success == success
        assert envelope.data.field == "dummy"

def test_base_envelope_validate():
    random_obj = {"message": "dummy", "success": True, "data": None, "random": True}
    with pytest.raises(expected_exception=ValidationError):
        BaseEnvelope.model_validate(random_obj)