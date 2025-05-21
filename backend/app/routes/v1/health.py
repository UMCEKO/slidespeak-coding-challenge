from fastapi import APIRouter

from app.schemas.base_response import BaseResponse

router = APIRouter(prefix="/health")

@router.get(
    "",
    summary="Health check",
    description="This will return 200 with the message \"healthy\" when the backend is running. Used for health checking in ci/cd.",
    tags=["Internal"],
    response_model=BaseResponse,
)
async def health_check():
    return BaseResponse(
        message="Healthy",
        success=True
    )