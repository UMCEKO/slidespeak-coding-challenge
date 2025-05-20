import uuid

import magic
from fastapi import APIRouter, File, UploadFile, HTTPException
from starlette.requests import Request

from app.core.config import settings
from app.schemas.convert import ConvertResponse
from app.services.s3 import s3_client
from app.tasks.convert import convert_pptx_to_pdf

router = APIRouter(prefix="/convert")

MAX_FILE_SIZE_BYTES = 1024 * 1024 * settings.MAX_FILE_SIZE_MB

@router.post(
    "",
    summary="Allows you to convert a PowerPoint file to a PDF file",
    response_model=ConvertResponse,
    response_description="The job id to be queried with the /v1/status/{job_id} endpoint.",
)
async def convert(request: Request,file: UploadFile = File(description="The PowerPoint file to be converted to pdf.")):
    # Check if file is over the size limits
    if file.size > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=422,
            detail=f"The file you've uploaded is too large, max file size is {settings.MAX_FILE_SIZE_MB} MB's"
        )
    # Get the file headers, magic only requires around this many bytes to recognize the file type.
    file_headers = await file.read(4096)
    mime_type = magic.from_buffer(file_headers)
    if "powerpoint" not in mime_type.lower():
        raise HTTPException(status_code=422, detail="The uploaded document is not a pdf file.")

    # Reset the byte pos of the file
    await file.seek(0)

    key = f"uploads/{uuid.uuid4()}"

    # Upload the file
    s3_client.put_object(
        Body=file.file,
        ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation",
        Bucket=settings.S3_BUCKET_NAME,
        Key=key
    )

    # Get the signed url to pass it onto the task queue
    url = s3_client.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": settings.S3_BUCKET_NAME,
            "Key": key,
        },
        ExpiresIn=settings.S3_PRESIGNED_URL_EXPIRY)

    result = convert_pptx_to_pdf.delay(url)

    return ConvertResponse(
        job_id=result.id,
        message="Worked?"
    )