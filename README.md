# Smart Task & Notes Management System

A full-stack MERN application with JWT authentication, task CRUD, search/filter, dark mode, and due dates.

## Project Structure

```
smart-task-notes/
├── backend/          # Node.js + Express + MongoDB
└── frontend/         # React
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

**.env values:**
- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — any long random string
- `PORT` — default 5000

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # set REACT_APP_API_URL
npm start
```

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/tasks | Yes | Get tasks (supports ?search=&status=) |
| POST | /api/tasks | Yes | Create task |
| PUT | /api/tasks/:id | Yes | Update task |
| DELETE | /api/tasks/:id | Yes | Delete task |

## Deployment

**Backend → Render:**
1. Push `backend/` to GitHub
2. Create a new Web Service on Render
3. Set environment variables (MONGO_URI, JWT_SECRET, PORT)

**Frontend → Vercel/Netlify:**
1. Push `frontend/` to GitHub
2. Import repo, set `REACT_APP_API_URL` to your Render backend URL
3. Deploy

## Features
- JWT authentication (register/login)
- Protected routes (frontend + backend)
- Task CRUD with status toggle
- Search & filter tasks
- Due dates with overdue highlighting
- Dark mode
- Responsive UI
