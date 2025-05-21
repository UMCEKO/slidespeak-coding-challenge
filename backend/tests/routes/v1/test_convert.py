import io
from unittest.mock import patch

import dotenv
import magic

from app.core.config import Settings
from app.schemas.convert import ConvertPayload
from app.schemas.base_envelope import BaseEnvelope

def test_convert_upload_success(client):
    fake_file = io.BytesIO(b"dummy data")
    fake_file.name = "presentation.pptx"

    mock_task_id = "123fakeid"
    with patch("app.routes.v1.convert.magic.from_buffer", return_value="powerpoint"), \
        patch("app.routes.v1.convert.s3_client.put_object"), \
        patch("app.routes.v1.convert.s3_client.generate_presigned_url", return_value="https://dummy-url"), \
        patch("app.routes.v1.convert.magic.from_buffer", return_value="powerpoint") as mock_magic, \
        patch("app.routes.v1.convert.convert_pptx_to_pdf.delay") as mock_celery:

        mock_celery.return_value.id = "123fakeid"

        response = client.post(
            "/v1/convert",
            files={"file": ("presentation.pptx", fake_file, "application/vnd.openxmlformats-officedocument.presentationml.presentation")}
        )
    assert response.status_code == 200
    payload = BaseEnvelope[ConvertPayload].model_validate(response.json())

    assert payload.success is True
    assert payload.message == "Successfully queued the conversion."
    assert payload.data.job_id == mock_task_id
