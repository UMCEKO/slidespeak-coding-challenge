import celery.result
from fastapi import APIRouter

from app.schemas.status import StatusResponse
from app.schemas.tasks import TaskResult, TaskStatusEnum
from app.tasks import convert_pptx_to_pdf

router = APIRouter(prefix="/status")


@router.get(
    "/{job_id}",
    response_model=StatusResponse,
    response_description="The current status of the conversion, with data if available.",
    summary="Check the status of the cocversion process"
)
async def status(job_id: str):
    result: celery.result.AsyncResult = convert_pptx_to_pdf.AsyncResult(job_id)
    task_result = TaskResult(
            status=result.status,
            ready=result.ready(),
            result=str(result.result) if result.ready() and not result.failed() else None,
            error=str(result.result) if result.failed() else None
        )
    return StatusResponse(
        message=get_message(task_result.status),
        success=True,
        status= task_result
    )


def get_message(task_status: TaskStatusEnum) -> str:
    if task_status == TaskStatusEnum.success:
        return "Successfully converted the file to PDF!"
    if task_status.started == TaskStatusEnum.started:
        return "The conversion has been started, please be patient while it is processing!"
    if task_status.pending == TaskStatusEnum.pending:
        return "The conversion is waiting to get started and is on queue!"
    return "Uh oh! Something went wrong!"