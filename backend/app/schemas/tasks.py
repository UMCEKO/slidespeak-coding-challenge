from enum import Enum
from typing import Any

from pydantic import BaseModel


class TaskStatusEnum(Enum):
    pending = "PENDING"
    started = "STARTED"
    success = "SUCCESS"
    failure = "FAILURE"

class TaskResult(BaseModel):
    status: TaskStatusEnum
    ready: bool
    result: Any