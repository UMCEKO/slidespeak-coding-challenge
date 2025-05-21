
from typing import TypeVar, Generic

from pydantic import BaseModel, ConfigDict

from app.schemas.base_response import BaseResponse

T = TypeVar("T", bound=BaseModel)

# This will be used for making sure the backend returns a standard response
class BaseEnvelope(BaseResponse, Generic[T]):
    data: T

