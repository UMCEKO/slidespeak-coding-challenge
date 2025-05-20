FROM python:3.12.3

WORKDIR /backend

ENV PYTHONUNBUFFERED=1

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY app app
COPY main.py main.py


CMD ["python", "main.py"]
