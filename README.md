# SoccerAI

SoccerAI is an AI-powered soccer analytics platform. This repository contains the source code for the platform, which is divided into multiple components: frontend, backend, and AI processors.

## The Problem We Are Solving
[TODO: Provide a brief description of the problem you are solving with SoccerAI, e.g., "Coaches and fans lack accessible, real-time, AI-driven insights into player performance and tactical analysis during matches."]

## Our AI/Technical Approach
Our solution integrates LangChain for advanced natural language processing and querying of match data, providing an intelligent conversational interface. The architecture consists of a React/Vite frontend, a Node.js/Prisma backend, and Python-based AI processors.

## Why Our Solution Matters
[TODO: Explain why this matters in the context of soccer and the World Cup, e.g., "By democratizing access to elite-level match analysis, we empower lower-tier teams and engage global fans during major tournaments like the World Cup."]

## Project Structure

- **`frontend/`**: The web client, built using React, TypeScript, and Vite.
- **`backend/`**: The main API server, built using Node.js, TypeScript, and Prisma ORM.
- **`ai-processors/`**: Python-based services for running AI models and processing data.

## Prerequisites

- Node.js
- Python 3.x
- Docker & Docker Compose (for running infrastructure like PostgreSQL and Redis)

## Getting Started

### 1. Infrastructure

Start the required infrastructure services (PostgreSQL and Redis) using Docker Compose:

```bash
docker-compose up -d
```

### 2. Backend

Navigate to the `backend` directory, install dependencies, and start the development server:

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend

Navigate to the `frontend` directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

### 4. AI Processors

Activate the Python virtual environment and install the necessary dependencies:

```bash
cd ai-processors
# Activate the venv (Windows)
venv\Scripts\activate
# Activate the venv (Linux/Mac)
# source venv/bin/activate
# Install requirements if applicable
# pip install -r requirements.txt
```

## License

This project is licensed under the MIT License.
