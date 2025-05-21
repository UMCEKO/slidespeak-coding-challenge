from pydantic import BaseModel, ConfigDict


class BaseResponse(BaseModel):
    model_config = ConfigDict(
        extra="forbid"
    )

    message: str
    success: bool