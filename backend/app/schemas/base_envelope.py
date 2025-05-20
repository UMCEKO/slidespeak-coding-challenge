from pydantic import BaseModel


# This will be used for making sure the backend returns a standard response
class BaseEnvelope(BaseModel):
    message: str
    success: bool = True
