from celery import Celery

from app.core.config import settings

celery = Celery(
    'task-queue',
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL
)

celery.conf.update(
    imports=["app.tasks"]
)