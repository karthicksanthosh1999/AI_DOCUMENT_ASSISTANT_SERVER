# AI Document Assistant – Backend

An AI-powered document assistant backend built with **Python, FastAPI, Groq LLM, PostgreSQL, and pgvector**. The application enables users to upload documents and ask natural-language questions about their content using Retrieval-Augmented Generation (RAG).

## 🚀 Overview

AI Document Assistant is a backend application designed to make document interaction smarter and more efficient.

Instead of manually reading lengthy documents, users can upload their documents and ask questions. The system retrieves relevant information from the uploaded content and uses a Large Language Model (LLM) to generate context-aware responses.

## ✨ Key Features

- **Document Upload:** Upload documents for AI-powered processing.
- **Text Extraction:** Extract readable text from uploaded documents.
- **Text Chunking:** Split documents into smaller, manageable chunks.
- **Text Embeddings:** Convert document chunks into vector representations.
- **Vector Storage:** Store embeddings using PostgreSQL and pgvector.
- **Semantic Search:** Retrieve relevant document content based on user questions.
- **AI Question Answering:** Generate contextual answers using Groq LLM.
- **RAG Pipeline:** Combine document retrieval with LLM-generated responses.
- **REST API:** Expose functionality through FastAPI endpoints.
- **API Documentation:** Interactive API documentation using Swagger UI.

## 🏗️ Architecture

The application follows a Retrieval-Augmented Generation (RAG) architecture.

```text
                 Client Application
                         |
                         v
                   FastAPI Server
                         |
              +----------+----------+
              |                     |
              v                     v
       Document Module          RAG Module
              |                     |
              v                     v
       Document Upload         User Question
              |                     |
              v                     v
        Text Extraction       Embedding Generation
              |                     |
              v                     v
         Text Chunking         Vector Similarity Search
              |                     |
              v                     v
       Embedding Generation   PostgreSQL + pgvector
              |                     |
              v                     v
       PostgreSQL + pgvector  Relevant Context
                                    |
                                    v
                               Groq LLM
                                    |
                                    v
                              AI Response
```

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming language |
| FastAPI | REST API framework |
| PostgreSQL | Relational database |
| pgvector | Vector similarity search |
| Groq API | LLM inference |
| Pydantic | Data validation |
| SQLAlchemy / Database Driver | Database integration |

## 📁 Project Structure

```text
AI_Document_Assistant_Server/
│
├── app/
│   ├── main.py
│   ├── core/
│   ├── config/
│   ├── database/
│   ├── modules/
│   │   ├── documents/
│   │   └── rag/
│   ├── services/
│   └── utils/
│
├── tests/
│
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

*Note: Update this structure to match the actual repository folders.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI_Document_Assistant_Server.git

cd AI_Document_Assistant_Server
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

Activate the environment:

**Windows**

```bash
venv\Scripts\activate
```

**Linux / macOS**

```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the project root.

```env
APP_NAME=AI Document Assistant
APP_ENV=development
DEBUG=True

DATABASE_URL=postgresql://username:password@localhost:5432/ai_document_assistant

GROQ_API_KEY=your_groq_api_key
```

Add any additional environment variables required by your implementation.

### 5. Database Setup

1. Install and configure PostgreSQL.
2. Create the application database.
3. Enable the pgvector extension.
4. Configure your database connection.
5. Run your database migrations or initialization scripts.

Enable pgvector:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### 6. Start the Development Server

Replace `app.main:app` with your actual FastAPI application import path if different.

```bash
uvicorn app.main:app --reload
```

The server will start at:

```text
http://localhost:8000
```

## 📚 API Documentation

FastAPI provides interactive API documentation.

| Documentation | URL |
|---|---|
| Swagger UI | http://localhost:8000/docs |
| ReDoc | http://localhost:8000/redoc |
| OpenAPI Schema | http://localhost:8000/openapi.json |

## 🔄 RAG Workflow

The document question-answering process follows these steps:

1. User uploads a document.
2. The backend extracts text from the document.
3. Extracted text is divided into smaller chunks.
4. An embedding model converts chunks into vector representations.
5. Vectors and document information are stored in PostgreSQL using pgvector.
6. User submits a question.
7. The question is converted into an embedding.
8. Vector similarity search retrieves relevant document chunks.
9. Retrieved context is passed to the Groq LLM.
10. The LLM generates a contextual answer.

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `APP_NAME` | Application name |
| `APP_ENV` | Application environment |
| `DEBUG` | Debug mode |
| `DATABASE_URL` | PostgreSQL connection string |
| `GROQ_API_KEY` | Groq API authentication key |

Never commit your `.env` file or expose API keys in your repository.

## 🧪 Testing

Run the test suite using:

```bash
pytest
```

## 🔮 Future Enhancements

- User authentication and authorization.
- Support for multiple document formats.
- Document management and deletion.
- Conversation history.
- Streaming AI responses.
- Multi-document question answering.
- Improved retrieval and reranking.
- Document summarization.
- Rate limiting and API security.
- Production deployment using Docker.

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Submit a pull request.

## 📄 License

This project is available under the MIT License. Add a `LICENSE` file to the repository if you intend to distribute it under this license.

---

**Built with Python, FastAPI, PostgreSQL, pgvector, and Groq.**
