import logging
from typing import List, Union, Optional
import os

import dotenv
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


# Load .env or fallback to .env.example
env_loaded = dotenv.load_dotenv(".env", override=False)
if not env_loaded:
    dotenv.load_dotenv(".env.example", override=False)
    logging.warning(".env not found. Falling back to .env.example")

class Settings(BaseSettings):
    # CORS
    CORS_ORIGINS: List[Union[str, AnyHttpUrl]] = ["*"]

    # S3 Configuration
    S3_ACCESS_KEY: str
    S3_SECRET_KEY: str
    S3_REGION: str
    S3_ENDPOINT: Optional[str] = None
    S3_BUCKET_NAME: str
    S3_PRESIGNED_URL_EXPIRY: int = 3600

    # Redis
    REDIS_URL: str

    # Other service URLs
    UNOSERVER_URL: str

    # File storage settings
    MAX_FILE_SIZE_MB: int = 50

    # App host config
    PORT: int = 3000
    HOST: str = "0.0.0.0"

settings = Settings()
