from typing import TypeVar, Generic

from pydantic import BaseModel

from app.schemas.base_response import BaseResponse

T = TypeVar("T")

class BaseError(BaseResponse, Generic[T]):
    detail: T