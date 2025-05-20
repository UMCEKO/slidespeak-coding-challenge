from pydantic_core import ErrorDetails

from app.schemas.base_envelope import BaseEnvelope


class ValidationErrorResponse(BaseEnvelope):
    detail: list[ErrorDetails]

class HTTPErrorResponse(BaseEnvelope):
    detail: str