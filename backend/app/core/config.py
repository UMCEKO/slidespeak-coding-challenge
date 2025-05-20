from typing import List, Union

import dotenv
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    dotenv.load_dotenv()

    # CORS
    CORS_ORIGINS: List[Union[str, AnyHttpUrl]] = ["*"]

    # S3 Configuration
    S3_ACCESS_KEY: str
    S3_SECRET_KEY: str
    S3_REGION: str
    S3_ENDPOINT: str
    S3_BUCKET_NAME: str
    S3_PRESIGNED_URL_EXPIRY: int = 3600

    # Redis
    REDIS_URL: str

    #
    UNOSERVER_URL: str

    # File storage settings
    MAX_FILE_SIZE_MB: int = 50

    # Other
    PORT: int = 3000
    HOST: str = "0.0.0.0"



settings = Settings()