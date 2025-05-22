# SlideSpeak coding challenge -- Front end app

![slidespeak-banner-github](https://github.com/SlideSpeak/slidespeak-webapp/assets/5519740/8ea56893-3c7a-42ee-906c-01e5797287af)

SlideSpeak was built with:

Frontend:

- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

## Requirements

- Bun installed to use it as a package runner (https://bun.sh/).

## Getting Started

Make sure to have the environment variables set up correctly, you can copy the values from .env.local.example with the
following command:

```bash
cp .env.local.example .env.local
```

Install all dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Docker Setup

The application can also be run using Docker Compose, which will set up both the frontend and backend services:

```bash
# Build and start the containers
docker compose up --build

# To run in detached mode
docker compose up -d

# To stop the containers
docker compose down
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

Note: Make sure to set up your environment variables in the `.env` file before running Docker Compose.

## Features

### PowerPoint to PDF Converter
- Convert PowerPoint presentations to PDF format
- Simple three-step process:
  1. Choose your PowerPoint file
  2. Confirm conversion settings
  3. Download the converted PDF
- Supports high-quality conversion with image and asset retention
- User-friendly interface with progress indicators
- Error handling for failed conversions
