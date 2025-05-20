from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from app.schemas.errors import HTTPErrorResponse, ValidationErrorResponse


def register_exception_handlers(app: FastAPI):

    @app.exception_handler(HTTPException)
    async def custom_http_exception_handler(_request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content=HTTPErrorResponse(
                success=False,
                message="There was an issue while processing your request.",
                detail=exc.detail
            ).model_dump()
        )

    @app.exception_handler(ValidationError)
    def custom_http_exception_handler(_request: Request, exc: ValidationError):
        return JSONResponse(
            status_code=422,
            content=ValidationErrorResponse(
                message="The request body is improperly formatted.",
                success=False,
                detail=exc.errors()
            )
        )