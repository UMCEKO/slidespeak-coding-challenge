from enum import Enum
from typing import Optional

from pydantic import BaseModel


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