from fastapi import APIRouter
from app.schemas.status import StatusResponse

router = APIRouter(prefix="/status")

@router.get(
    "/{job_id}",
    response_model=StatusResponse,
    response_description="The current status of the conversion, with data if available.",
    summary="Check the status of the conversion process"
)
async def status(job_id: str):
    pass
