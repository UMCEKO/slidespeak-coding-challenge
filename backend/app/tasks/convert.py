import asyncio
import time
from typing import cast

from celery import Task

from app.worker import celery


@celery.task(name="convert-to-pdf")
def convert_pptx_to_pdf(pptx_url: str):
    time.sleep(10)
    return "Hello world!"


# I did this to have intellisense, I could not find a better/cleaner way and gave up after around 1 hour of searching
convert_pptx_to_pdf = cast(Task, convert_pptx_to_pdf)

