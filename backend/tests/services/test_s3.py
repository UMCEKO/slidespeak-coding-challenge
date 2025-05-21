import pytest
from unittest.mock import patch
from app.services.s3 import check_s3  # adjust import as needed
from app.core.config import settings

def test_check_s3_bucket_exists():
    mock_buckets = {"Buckets": [{"Name": settings.S3_BUCKET_NAME}]}

    with patch("app.services.s3.s3_client.list_buckets", return_value=mock_buckets):
        check_s3()

def test_check_s3_bucket_missing():
    mock_buckets = {"Buckets": [{"Name": "something-else"}]}

    with patch("app.services.s3.s3_client.list_buckets", return_value=mock_buckets), \
         patch("app.services.s3.logger.error") as mock_logger, \
         pytest.raises(SystemExit):
        check_s3()
        mock_logger.assert_called_once()

def test_check_s3_client_error():
    with patch("app.services.s3.s3_client.list_buckets", side_effect=Exception("AWS is down")), \
         pytest.raises(Exception):
        check_s3()
