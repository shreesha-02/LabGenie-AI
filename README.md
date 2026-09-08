# LabGenie AI

### IBM SkillsBuild / AICTE Internship Project

LabGenie AI is an AI-powered laboratory learning platform that helps students generate structured lab manuals, understand concepts with an AI tutor, and practice algorithms through interactive virtual experiments.

Powered by **IBM watsonx.ai**, **IBM Granite 4 H Small**, and a lightweight **RAG-based knowledge retrieval system**.

---

## ✨ Key Features

### 🤖 AI Lab Manual Generator

Generate complete experiment manuals based on:

- Subject
- Experiment / Topic
- Difficulty level

Each generated manual includes:

- Aim
- Theory
- Requirements
- Procedure
- Code
- Expected Output
- Precautions
- Viva Questions with Answers
- 100-Mark Evaluation Rubric

### 📚 RAG-Enhanced Learning

LabGenie uses a curated local knowledge base to retrieve relevant information before generating AI responses.

The knowledge base contains resources for:

- Data Structures
- Python
- DBMS
- Operating Systems
- Computer Networks
- Machine Learning

The retriever uses keyword-based relevance scoring and provides the most relevant context to IBM Granite.

### 💬 AI Learning Tutor

Students can ask questions about laboratory concepts and receive contextual explanations powered by IBM Granite and RAG.

The tutor can help with:

- Concept explanations
- Algorithms
- Time complexity
- Precautions
- Real-world applications
- Topic-specific questions

### 🧪 Interactive Virtual Lab

LabGenie includes browser-based interactive experiments for:

- K-Means Clustering
- Binary Search

These simulations run entirely on the client side and do not require AI or network requests.

### 🎯 Difficulty-Based Learning

Experiments can be generated at:

- Beginner
- Intermediate
- Advanced

---

## 🏗️ System Architecture

```text
Student
   ↓
React Frontend
   ├── Generate
   ├── AI Tutor
   └── Virtual Lab
          │
          │ Generate / Ask
          ▼
Node.js / Express Backend
          ↓
RAG Knowledge Base
          ↓
IBM watsonx.ai
(Granite 4 H Small)
          ↓
AI-Generated Output
```

---

## 🛠️ Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- REST APIs
- CORS
- dotenv

### AI & Cloud

- IBM watsonx.ai
- IBM Granite 4 H Small
- IBM Cloud
- IAM Authentication

### Knowledge Retrieval

- Lightweight keyword-based RAG
- Curated Markdown knowledge base

---

## 📁 Project Structure

```text
LabGenie-AI/
│
├── backend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── index.js
│       ├── routes/
│       │   ├── health.js
│       │   ├── lab.js
│       │   └── assistant.js
│       ├── controllers/
│       │   ├── labController.js
│       │   └── assistantController.js
│       └── rag/
│           └── retriever.js
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── services/
│       │   └── labService.js
│       └── components/
│           ├── Header.jsx
│           ├── GeneratorForm.jsx
│           ├── LabManualResults.jsx
│           ├── SectionCard.jsx
│           ├── Footer.jsx
│           ├── VirtualLab.jsx
│           └── AiLabAssistant.jsx
│
├── knowledge_base/
│   ├── data_structures.md
│   ├── python.md
│   ├── dbms.md
│   ├── operating_systems.md
│   ├── computer_networks.md
│   └── machine_learning.md
│
├── README.md
└── SB4UniversityEngagements_AICTE_Problem Statements_2026.pdf
```

---

## 🔌 API Endpoints

### Health Check

`GET /api/health`

### Generate Lab Manual

`POST /api/lab/generate`

### AI Tutor

`POST /api/assistant/ask`

---

## ⚙️ Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shreesha-02/LabGenie-AI.git
cd LabGenie-AI
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`:

```env
PORT=5000
WATSONX_API_KEY=your_watsonx_api_key
WATSONX_PROJECT_ID=your_watsonx_project_id
WATSONX_URL=https://us-south.ml.cloud.ibm.com
```

Start the backend:

```bash
npm start
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

---

## 🔐 Security

- IBM credentials are stored only in backend environment variables.
- The real `.env` file is excluded from version control.
- Only `.env.example` is included in the repository.
- The frontend never directly handles IBM API credentials.

---

## 🧠 RAG Implementation

LabGenie uses a lightweight local retrieval system instead of a vector database.

The retriever:

1. Reads the curated Markdown knowledge base.
2. Matches the requested subject and topic.
3. Scores relevant content using keyword-based relevance.
4. Selects the most relevant sources.
5. Adds the retrieved context to the IBM Granite prompt.

---

## 🚀 Project Status

- ✅ AI Lab Manual Generation
- ✅ IBM Granite 4 H Small Integration
- ✅ RAG Knowledge Retrieval
- ✅ AI Learning Tutor
- ✅ Interactive K-Means Experiment
- ✅ Interactive Binary Search Experiment
- ✅ Viva Questions
- ✅ Evaluation Rubric
- ✅ Difficulty-Based Generation
- ✅ Manual Download
- ✅ Responsive Web Interface

---

## 🎓 Project Context

Developed as part of the **IBM SkillsBuild / AICTE Internship Project** based on:

**Problem Statement No. 11 – AI Lab Manual & Experiment Generator**

---

## 📜 License

This project is created for educational purposes as part of the **IBM SkillsBuild / AICTE Internship Project**.
