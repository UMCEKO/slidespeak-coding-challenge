from fastapi import APIRouter
from . import v1
from ..schemas.errors import ValidationErrorResponse

router = APIRouter(responses={
    422: {
        "description": "Validation Error",
        "model": ValidationErrorResponse
    }
})

router.include_router(v1.router)
