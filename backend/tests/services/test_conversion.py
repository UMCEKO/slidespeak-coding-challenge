from unittest.mock import patch, MagicMock

import pytest
from requests import HTTPError

from app.services.conversion import convert_powerpoint_to_pdf


@pytest.mark.asyncio
async def test_convert_powerpoint_to_pdf_success():
    dummy_pptx_bytes = b"pptx file content"
    dummy_pdf_bytes = b"%PDF-1.4\n..."

    with patch("app.services.conversion.httpx.get") as get_mock, \
            patch("app.services.conversion.httpx.post") as post_mock, \
            patch("app.services.conversion.s3_client.put_object"), \
            patch("app.services.conversion.s3_client.generate_presigned_url") as presign_mock:

        get_mock.return_value = MagicMock(
            status_code=200,
            content=dummy_pptx_bytes
        )

        post_mock.return_value = MagicMock(
            status_code=200,
            content=dummy_pdf_bytes
        )

        presign_mock.return_value = "https://dummy-url/converted.pdf"

        result = await convert_powerpoint_to_pdf("https://fake.url/file.pptx")

        assert result == "https://dummy-url/converted.pdf"

@pytest.mark.asyncio
async def test_convert_powerpoint_to_pdf_get_failure():
    with patch("app.services.conversion.httpx.get", side_effect=HTTPError), \
            pytest.raises(HTTPError):
        await convert_powerpoint_to_pdf("https://fake.url/file.pptx")

@pytest.mark.asyncio
async def test_convert_powerpoint_to_pdf_post_timeout():
    dummy_pptx_bytes = b"pptx file content"

    with patch("app.services.conversion.httpx.get") as mock_get, \
         patch("app.services.conversion.httpx.post", side_effect=Exception("Timeout converting")):

        mock_get.return_value = MagicMock(
            status_code=200,
            content=dummy_pptx_bytes,
            raise_for_status=lambda: None
        )

        with pytest.raises(Exception) as e:
            await convert_powerpoint_to_pdf("https://fake-url/pptx")
        assert "Timeout converting" in str(e.value)


@pytest.mark.asyncio
async def test_convert_powerpoint_to_pdf_get_timeout():
    with patch("app.services.conversion.httpx.get", side_effect=Exception("Timed out")):
        with pytest.raises(Exception) as e:
            await convert_powerpoint_to_pdf("https://fake-url/pptx")
        assert "Timed out" in str(e.value)
