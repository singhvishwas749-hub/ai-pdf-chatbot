AI PDF Chatbot

An AI-powered PDF question-answering application that allows users to upload a PDF and ask questions about its content.

Features

* Upload and process PDF documents
* Extract and split PDF text into chunks
* Generate embeddings using OpenAI
* Store embeddings in PostgreSQL with pgvector
* Retrieve relevant PDF content using vector similarity search
* Generate answers using an OpenAI model
* React-based chat interface with loading and error handling

Tech Stack

Frontend: React, Vite, Tailwind CSS

Backend: Python, FastAPI, Pydantic, PyPDF

AI: OpenAI API, text-embedding-3-small

Database: PostgreSQL, pgvector, psycopg

How It Works

PDF → Text Extraction → Chunking → Embeddings → PostgreSQL/pgvector

Question → Question Embedding → Similarity Search → Relevant Chunks → AI Response

Setup

1. Clone the repository

git clone https://github.com/singhvishwas749-hub/ai-pdf-chatbot.git

2. Install backend dependencies

python -m venv venv

.\venv\Scripts\Activate.ps1

pip install -r requirements.txt

3. Configure environment variables

Create a .env file in the project root:

OPENAI_API_KEY=your_openai_api_key
DB_PASSWORD=your_postgresql_password

Create frontend/.env:

VITE_API_URL=http://127.0.0.1:8000

Never commit these environment files to GitHub.

4. Start the backend

uvicorn main:app --reload

5. Start the frontend

cd frontend

npm install

npm run dev

Database

The application uses PostgreSQL with pgvector to store PDF chunks and their embeddings and perform vector similarity search.

Future Improvements

* User authentication
* Document management
* OCR support
* Streaming responses
* Automated tests
* Deployment

Author

Vishwas Singh
GitHub: https://github.com/singhvishwas749-hub
