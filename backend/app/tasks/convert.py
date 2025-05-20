import asyncio
from typing import cast

from celery import Task
from app.services.conversion import convert_powerpoint_to_pdf
from app.worker import celery


@celery.task(
    name="convert-to-pdf",
    # This task can only run one instance at a time
    acks_late = True,
    reject_on_worker_lost = True
)
def convert_task(pptx_url: str):
    result = asyncio.run(convert_powerpoint_to_pdf(pptx_url))
    return result

# I did this to have intellisense, I could not find a better/cleaner way and gave up after around 1 hour of searching
convert_pptx_to_pdf = cast(Task, convert_task)

