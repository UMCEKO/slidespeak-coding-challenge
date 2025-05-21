from pydantic import BaseModel

from app.schemas.base_envelope import BaseEnvelope


class ConvertPayload(BaseModel):
    job_id: str

ConvertResponse = BaseEnvelope[ConvertPayload]

