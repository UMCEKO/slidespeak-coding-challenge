from fastapi import APIRouter

from app.schemas.base_envelope import BaseEnvelope

router = APIRouter(prefix="/health")

@router.get(
    "",
    summary="Health check",
    description="This will return 200 with the message \"healthy\" when the backend is running. Used for health checking in ci/cd.",
    tags=["Internal"]
)
async def health_check():
    return BaseEnvelope(
        message="Healthy"
    )