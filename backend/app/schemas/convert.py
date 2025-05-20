from app.schemas.base_envelope import BaseEnvelope


class ConvertResponse(BaseEnvelope):
    request_id: str