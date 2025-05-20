from app.schemas.base_envelope import BaseEnvelope
from app.schemas.tasks import TaskResult


class StatusResponse(BaseEnvelope):
    status: TaskResult