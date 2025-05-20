import uuid

import httpx

from app.core.config import settings
from app.services.s3 import s3_client


async def convert_powerpoint_to_pdf(powerpoint_url: str):
    try:
        pptx_response = httpx.get(powerpoint_url)
    except httpx.TimeoutException as e:
        raise Exception("Timed out while trying to get the PowerPoint.")
    pptx_response.raise_for_status()

    try:
        destination_response = httpx.post(
            settings.UNOSERVER_URL + "/request",
            files={
                "file": pptx_response.content
            },
            data={"convert-to": "pdf"}
        )
    except httpx.TimeoutException as e:
        raise Exception("Timed out while trying to convert to pdf.")
    key = f"converted/{uuid.uuid4()}"

    s3_client.put_object(
        Bucket=settings.S3_BUCKET_NAME,
        ContentType="application/pdf",
        Body=destination_response.content,
        Key=key
    )

    presigned_url = s3_client.generate_presigned_url(
        'get_object',
        Params={
            'Bucket': settings.S3_BUCKET_NAME,
            'Key': key
        },
        ExpiresIn=settings.S3_PRESIGNED_URL_EXPIRY
    )

    return presigned_url
