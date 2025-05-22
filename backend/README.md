# PowerPoint to PDF Conversion API

This is the backend API service for SlideSpeak's PowerPoint to PDF conversion tool. The service allows users to upload PowerPoint files, convert them to PDF format, and retrieve the converted files via a presigned URL.

## Tech Stack

- **FastAPI 0.115.12**: Modern, fast web framework for building APIs
- **Celery 5.5.2**: Distributed task queue for handling conversions asynchronously
- **Redis 5.3.0**: Message broker for Celery
- **Unoserver 3.19**: LibreOffice-based document conversion service
- **S3/Cloudflare R2**: Storage solution for uploaded files and converted PDFs
- **Docker**: Containerization for easy deployment and development
- **Python 3.12.3**: Core programming language

## Getting Started

### Prerequisites

- Docker and Docker Compose
- AWS S3 compatible storage (e.g., Cloudflare R2) credentials
- Python 3.12.3
- curl (for health checks)

### Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the required variables:

```bash
# S3 Configuration
S3_ENDPOINT_URL=your_s3_endpoint
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=your_bucket_name
S3_REGION=your_region

# Redis Configuration
REDIS_URL=redis://redis:6379/0

# Application Settings
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_EXTENSIONS=pptx,ppt
PORT=3000  # Default port for the API
```

### Running the Application

Start the application using Docker Compose:

```bash
docker compose up
```

This will start the following services with health checks:

1. **Backend API** (FastAPI)
   - Port: 3000 (configurable via PORT env var)
   - Health check: `GET /v1/health`
   - Depends on: Celery worker

2. **Celery Worker**
   - Depends on: Redis and Unoserver
   - Health check: Celery ping
   - Environment: REDIS_URL, UNOSERVER_URL

3. **Unoserver** (LibreOffice conversion service)
   - Version: 3.19
   - Port: 2004 (internal only)
   - Health check: HTTP 404 response check

4. **Redis**
   - Version: Alpine
   - Port: 6379 (internal only)
   - Health check: Redis PING command

The API will be available at `http://localhost:3000`

## API Documentation

### Endpoints

This API is self-documented and fully browsable at:

- `/docs` — Swagger UI
- `/redoc` — ReDoc format

### Main Endpoints

- `POST /api/v1/convert`: Upload and convert PowerPoint files
- `GET /api/v1/status/{task_id}`: Check conversion status
- `GET /api/v1/health`: Health check endpoint

## Architecture

This service follows a task-based architecture:

1. **API Layer** (FastAPI): Handles HTTP requests, file validation, and task delegation
2. **Task Queue** (Celery): Manages asynchronous conversion tasks
3. **Storage Layer** (S3 or any S3 compatible storage): Stores uploaded files and converted PDFs
4. **Conversion Service** (Unoserver): Performs the actual conversion from PPTX to PDF

### Service Dependencies

```
Backend API
    └── Celery Worker
        ├── Redis
        └── Unoserver
```

## Security Features

- File validation using magic bytes
- File size limits
- S3 SigV4 authentication
- Temporary presigned URLs for file access
- CORS protection
- Internal-only service ports (Redis, Unoserver)

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

### Local Development Setup

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the development server:
```bash
uvicorn app.main:app --reload --port 3000
```

### Running Tests

```bash
# Run unit tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_convert.py
```

## Deployment

The application is designed to be deployed using Docker containers. The provided Docker Compose file can be used for development and production with appropriate modifications.

### Docker Configuration

- Base image: `python:3.12.3`
- Working directory: `/backend`
- Python unbuffered output enabled
- Multi-stage build for optimized image size
- Health checks for all services
- Service dependencies properly configured

### Production Considerations

1. Set appropriate environment variables for production
2. Configure proper logging and monitoring
3. Set up SSL/TLS termination
4. Configure proper backup strategies for Redis and S3
5. Set up proper scaling for Celery workers based on load
6. Consider using Redis persistence for production
7. Monitor Unoserver memory usage
8. Set up proper error tracking and alerting
9. Configure rate limiting for API endpoints
10. Set up proper backup and retention policies for converted files

## Troubleshooting

### Common Issues

1. **Unoserver Connection Issues**
   - Check if Unoserver is running: `curl http://localhost:2004/`
   - Verify Celery worker can connect to Unoserver

2. **Redis Connection Issues**
   - Check Redis logs: `docker compose logs redis`
   - Verify Redis connection string in environment variables

3. **S3 Storage Issues**
   - Verify S3 credentials and permissions
   - Check bucket existence and access
   - Verify file size limits

## License

[MIT License](LICENSE)