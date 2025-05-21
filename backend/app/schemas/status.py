from enum import Enum
from typing import Optional

from pydantic import BaseModel

from app.schemas.base_envelope import BaseEnvelope

class TaskStatusEnum(Enum):
    pending = "PENDING"
    started = "STARTED"
    success = "SUCCESS"
    failure = "FAILURE"


class TaskResult(BaseModel):
    status: TaskStatusEnum
    ready: bool
    result: Optional[str]
    error: Optional[str]

StatusResponse = BaseEnvelope[TaskResult]