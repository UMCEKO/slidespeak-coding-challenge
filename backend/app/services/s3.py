import boto3
import botocore.exceptions
from botocore.config import Config
# For type definitions
from mypy_boto3_s3.client import S3Client
from app.core.config import settings
from app.core.logger import logger

# We will use this client whenever s3 client is necessary.

s3_client: S3Client = boto3.client(
    "s3",
    endpoint_url=settings.S3_ENDPOINT,
    region_name=settings.S3_REGION,
    aws_access_key_id=settings.S3_ACCESS_KEY,
    aws_secret_access_key=settings.S3_SECRET_KEY,
    config=Config(signature_version='s3v4')
)

def check_s3():
    try:
        logger.info("Checking buckets...")
        buckets = s3_client.list_buckets()

        # Check if bucket exists
        if settings.S3_BUCKET_NAME not in [b["Name"] for b in buckets["Buckets"]]:
            logger.error(f"The bucket \"{settings.S3_BUCKET_NAME}\" does not exist in S3.")
            exit(1)

        logger.info("Bucket found!")
    except botocore.exceptions.ClientError as e:
        logger.info(f"S3 client error: {e}")
        raise

