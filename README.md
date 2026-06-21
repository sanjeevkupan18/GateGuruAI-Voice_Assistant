# GateGuru AI

GateGuru AI is a voice-enabled GATE exam assistant for beginner students. It helps with exam structure, subject-wise guidance, study strategies, PSU/M.Tech questions, and conversation history.

## Features

- GATE-focused AI guidance for branches like CSE, ECE, ME, CE, EE, and IN
- Voice input and spoken AI responses in the client
- Conversation history stored in MongoDB
- Safe branch-specific system prompts for better answers
- REST API for chat, history, and clear-history actions

## Tech Stack

- Frontend: React, Vite, Axios
- Backend: Node.js, Express
- Database: MongoDB
- AI: Groq SDK

## Project Structure

- `client/` - React frontend
- `server/` - Express backend and AI logic

## Setup

### 1. Install dependencies

Run this in both folders:

```bash
cd client
npm install

cd ../server
npm install
```

### 2. Configure environment variables

Create a local `.env` file in `server/` with your own values:

```env
GROQ_API_KEY=your_groq_api_key_here
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

Optional client config:

```env
VITE_API_URL=http://localhost:5000/api
```

Important:

- Never commit real API keys, database URLs, or private credentials
- Keep secrets only in local `.env` files
- If you need to share setup, use the example files instead of real values

### 3. Run the app

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

## API

- `POST /api/chat` - send a message and get an AI reply
- `GET /api/history/:sessionId` - fetch conversation history
- `DELETE /api/history/:sessionId` - clear a conversation

## Notes

- The assistant is specialized for GATE and engineering education
- It keeps responses short and beginner-friendly
- It does not store or expose your private API keys in the repository

