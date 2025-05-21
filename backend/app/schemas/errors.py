from pydantic_core import ErrorDetails

from app.schemas.base_envelope import BaseEnvelope
from app.schemas.base_error import BaseError


ValidationErrorResponse = BaseError[ErrorDetails]

HTTPErrorResponse = BaseError[str]