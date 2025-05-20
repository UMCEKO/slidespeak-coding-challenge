from typing import List, Union

import dotenv
import os

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    dotenv.load_dotenv()

    # CORS
    CORS_ORIGINS: List[Union[str, AnyHttpUrl]] = ["*"]

    # S3 Configuration
    S3_ACCESS_KEY: str = os.getenv("S3_ACCESS_KEY")
    S3_SECRET_KEY: str = os.getenv("S3_SECRET_KEY")
    S3_REGION: str = os.getenv("S3_REGION")
    S3_ENDPOINT: str = os.getenv("S3_ENDPOINT", None)
    S3_BUCKET_NAME: str = os.getenv("S3_BUCKET")
    S3_PRESIGNED_URL_EXPIRY: int = 3600

    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL")

    # File storage settings
    MAX_FILE_SIZE_MB: int = 50

    # Other
    PORT: int = int(os.getenv("PORT", "3000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")



settings = Settings()