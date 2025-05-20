from fastapi import APIRouter
from app.schemas.status import StatusResponse
from app.schemas.tasks import TaskResult
from app.tasks import convert_pptx_to_pdf

router = APIRouter(prefix="/status")

@router.get(
    "/{job_id}",
    response_model=StatusResponse,
    response_description="The current status of the conversion, with data if available.",
    summary="Check the status of the cocversion process"
)
async def status(job_id: str):
    result = convert_pptx_to_pdf.AsyncResult(job_id)

    return StatusResponse(
        message="Successfully checked the status of the task.",
        success=True,
        status=TaskResult(
            status=result.status,
            ready=result.ready(),
            result=result.result if result.ready() else None
        )
    )