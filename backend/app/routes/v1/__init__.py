from fastapi import APIRouter

from . import status, convert, health

router = APIRouter(prefix="/v1")

router.include_router(status.router)
router.include_router(convert.router)
router.include_router(health.router)