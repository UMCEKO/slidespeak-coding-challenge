from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import routes
from app.core.config import settings
from app.core.logger import logger
from app.exceptions import register_exception_handlers
from app.services.s3 import check_s3


@asynccontextmanager
async def lifespan(lifespan_app: FastAPI):
    # Register exception handlers for clean error messages
    register_exception_handlers(lifespan_app)
    logger.info("Registered exception handlers.")

    # Check S3 settings to catch abnormalities early-on
    logger.info("Checking S3...")
    check_s3()
    logger.info("S3 is configured correctly.")

    logger.info("Starting server...")
    yield

app = FastAPI(
    lifespan=lifespan,
    description="PowerPoint to PDF Conversion Service",
)
app.include_router(routes.router)

origins = [
    "http://localhost",
    "http://localhost:8080",
    "https://frontend.umceko.com"
]

# Set up cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def main():
    uvicorn.run(app, port=settings.PORT, host=settings.HOST)