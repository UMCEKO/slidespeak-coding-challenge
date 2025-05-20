# PowerPoint to PDF Conversion API

This is the backend API service for SlideSpeak's PowerPoint to PDF conversion tool. The service allows users to upload PowerPoint files, convert them to PDF format, and retrieve the converted files via a presigned URL.

## Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **Celery**: Distributed task queue for handling conversions asynchronously
- **Redis**: Message broker for Celery
- **Unoserver**: LibreOffice-based document conversion service
- **S3/Cloudflare R2**: Storage solution for uploaded files and converted PDFs
- **Docker**: Containerization for easy deployment and development

## Getting Started

### Prerequisites

- Docker and Docker Compose
- AWS S3 compatible storage (e.g., Cloudflare R2) credentials
- Python 3.12+

### Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the required variables

### Running the Application

Start the application using Docker Compose:

```bash
docker compose up
```

This will start:
- The FastAPI application
- Celery worker
- Redis service
- Unoserver conversion service

## API Documentation

### Endpoints

This API is self-documented and fully browsable at:

- `/docs` — Swagger UI
- `/redoc` — ReDoc format

## Architecture

This service follows a task-based architecture:

1. **API Layer** (FastAPI): Handles HTTP requests, file validation, and task delegation
2. **Task Queue** (Celery): Manages asynchronous conversion tasks
3. **Storage Layer** (S3 or any S3 compatible storage): Stores uploaded files and converted PDFs
4. **Conversion Service** (Unoserver): Performs the actual conversion from PPTX to PDF

## Security Features

- File validation using magic bytes
- File size limits
- S3 SigV4 authentication
- Temporary presigned URLs for file access
- CORS protection

## Development

### Project Structure

```
app/
├── core/
│   ├── config.py          # Application configuration
│   └── logger.py          # Logging setup
├── exceptions.py          # Centralized exception handling
├── main.py                # Application setup and lifecycle
├── routes/
│   └── v1/
│       ├── convert.py     # Conversion endpoint
│       ├── status.py      # Status checking endpoint
│       └── health.py      # Health checking endpoint
├── schemas/
│   ├── base_envelope.py   # Base response envelope
│   ├── convert.py         # Request/response schemas for conversion
│   ├── errors.py          # Error response schemas
│   ├── status.py          # Status response schemas
│   └── tasks.py           # Task status schemas
├── services/
│   ├── conversion.py      # PowerPoint to PDF conversion logic
│   └── s3.py              # S3 integration
├── tasks/
│   └── convert.py         # Celery task definitions
└── worker.py              # Celery worker configuration
```

### Running Tests

```bash
# Run unit tests
pytest

# Run with coverage
pytest --cov=app tests/
```

## Deployment

The application is designed to be deployed using Docker containers. The provided Docker Compose file can be used for development and production with appropriate modifications.

## License

[MIT License](LICENSE)