# LabGenie AI

> **IBM SkillsBuild / AICTE Internship Project**

An AI-powered agent that helps students and educators generate **structured laboratory experiment manuals** from a subject and topic. Powered by **IBM Granite** (watsonx.ai) and **RAG** (Retrieval-Augmented Generation) — _integration coming in a future phase_.

---

## Table of Contents

- [Project Purpose](#project-purpose)
- [Current Architecture](#current-architecture)
- [Folder Structure](#folder-structure)
- [How to Run](#how-to-run)
- [API Reference](#api-reference)
- [Roadmap](#roadmap)

---

## Project Purpose

Lab manuals are essential in engineering and science education, but writing them from scratch is time-consuming. LabGenie AI solves this by letting students or educators enter a **subject** and **experiment topic**, choose a **difficulty level**, and instantly receive a complete structured lab manual with:

- Aim
- Theory
- Requirements
- Procedure
- Code (with syntax)
- Expected Output
- Precautions
- Viva Questions & Answers
- Evaluation Rubric

---

## Current Architecture

```
Browser (React + Vite)
        │
        │  POST /api/lab/generate
        ▼
Express Backend (Node.js)
        │
        │  [Phase 2] IBM watsonx.ai — Granite LLM
        │  [Phase 2] RAG — vector DB / document retrieval
        ▼
  Mock Response (current)
```

**Phase 1 (this step):** Full-stack scaffold with mock data. No external API calls.  
**Phase 2 (upcoming):** Replace mock controller with IBM Granite LLM + RAG pipeline.

---

## Folder Structure

```
LabGenie-AI/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── labController.js   # Business logic (mock → Granite in Phase 2)
│   │   ├── routes/
│   │   │   ├── health.js          # GET /api/health
│   │   │   └── lab.js             # POST /api/lab/generate
│   │   └── index.js               # Express app entry point
│   ├── .env.example               # Environment variable template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx         # App branding & description
│   │   │   ├── GeneratorForm.jsx  # Subject / topic / difficulty inputs
│   │   │   ├── LabManualResults.jsx  # Renders all manual sections
│   │   │   ├── SectionCard.jsx    # Reusable section wrapper
│   │   │   └── Footer.jsx
│   │   ├── services/
│   │   │   └── labService.js      # fetch() calls to the backend
│   │   ├── App.jsx                # Root component & state
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # All styles (no external CSS library)
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

---

### 1. Backend

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# (Optional) Copy and edit the environment file
cp .env.example .env

# Start the development server (auto-restarts on file changes)
npm run dev

# Or start without auto-restart
npm start
```

The backend will run at **http://localhost:5000**

**Health check:** `GET http://localhost:5000/api/health`

---

### 2. Frontend

Open a **new terminal**, then:

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

The frontend will run at **http://localhost:3000**

> The Vite dev server automatically proxies `/api/*` requests to `localhost:5000`, so both servers can run simultaneously without CORS issues in development.

---

### 3. Build for Production

```bash
# In the frontend folder
npm run build
# Output goes to frontend/dist/
```

---

## API Reference

### `GET /api/health`

Returns server status.

**Response:**
```json
{
  "status": "ok",
  "service": "LabGenie AI Backend",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

### `POST /api/lab/generate`

Generates a structured lab manual.

**Request body:**
```json
{
  "subject": "Data Structures",
  "topic": "Bubble Sort Algorithm",
  "difficulty": "Intermediate"
}
```

**Response:**
```json
{
  "success": true,
  "manual": {
    "aim": "...",
    "theory": "...",
    "requirements": ["..."],
    "procedure": ["..."],
    "code": "...",
    "expectedOutput": "...",
    "precautions": ["..."],
    "vivaQuestions": [{ "question": "...", "answer": "..." }],
    "evaluationRubric": [{ "criterion": "...", "marks": 20 }],
    "meta": { "subject": "...", "topic": "...", "difficulty": "..." }
  }
}
```

---

## Roadmap

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | Full-stack scaffold with mock data | ✅ Done |
| 2 | IBM Granite LLM integration via watsonx.ai | 🔜 Planned |
| 3 | RAG pipeline with document retrieval | 🔜 Planned |
| 4 | PDF export of lab manual | 🔜 Planned |
| 5 | User authentication & saved manuals | 🔜 Planned |

---

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `PORT` | backend/.env | Express server port (default: 5000) |
| `IBM_GRANITE_API_URL` | backend/.env | IBM watsonx.ai inference endpoint (Phase 2) |
| `IBM_API_KEY` | backend/.env | IBM Cloud API key (Phase 2) |
| `IBM_PROJECT_ID` | backend/.env | watsonx.ai project ID (Phase 2) |
| `VITE_API_BASE_URL` | frontend/.env | Backend URL (optional; defaults to `/api` proxy) |

> **Never commit `.env` files with real credentials to version control.**

---

## License

This project is created for educational purposes as part of the IBM SkillsBuild / AICTE Internship programme.
