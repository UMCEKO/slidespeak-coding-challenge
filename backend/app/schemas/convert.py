from app.schemas.base_envelope import BaseEnvelope


class ConvertResponse(BaseEnvelope):
    job_id: str