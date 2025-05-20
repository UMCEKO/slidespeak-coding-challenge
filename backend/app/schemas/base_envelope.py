from pydantic import BaseModel
from typing_extensions import Optional, TypeVar, Generic

# This will be used for making sure the backend returns a standard response
class BaseEnvelope(BaseModel):
    message: str
    success: bool = True
