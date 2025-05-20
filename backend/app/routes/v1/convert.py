from fastapi import APIRouter, File

from app.schemas.convert import ConvertResponse

router = APIRouter(prefix="/convert")

@router.post(
    "",
    summary="Allows you to convert a PowerPoint file to a PDF file",
    response_model=ConvertResponse,
    response_description="The job id to be queried with the /v1/status/{job_id} endpoint.",
)
async def convert(file = File(description="The PowerPoint file to be converted to pdf.")):
    pass
