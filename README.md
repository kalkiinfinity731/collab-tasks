# Collab - Task Collaboration Tool

A full stack web development project featuring Kanban-style task collaboration for teams. Create, track, and organize tasks with start/end dates, deadlines, and coordinators.

**Run:** `npm run dev` | **Port:** 5000

## Project Scope

This project demonstrates a complete full stack web application with:
- User registration and authentication with JWT
- Task CRUD operations with status tracking (To Do, In Progress, Review, Done)
- Project coordination features (start date, end date, deadline, coordinator)
- User profile management with designation roles
- Workspace organization for team collaboration
- Responsive UI with TailwindCSS
- MongoDB integration with in-memory fallback for development

## Features

- **User Authentication**: Register, login, and profile management
- **Task Management**: Create, read, update, delete tasks with Kanban board visualization
- **Workspaces**: Organize tasks by personal, team, or project workspaces
- **Profile**: Set designation (developer, tester, team lead, manager, etc.)

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (optional - in-memory fallback available)
- **Frontend**: HTML, TailwindCSS, Vanilla JavaScript
- **Auth**: JWT-based authentication

## Pages

- `/` - Login page
- `/register.html` - User registration
- `/kanban.html` - Task board with To Do, In Progress, Review, Done columns
- `/dashboard.html` - Analytics dashboard
- `/profile.html` - User profile management

## API Endpoints

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/workspaces` - Get workspaces
- `POST /api/workspaces` - Create workspace

## Run the Application

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Environment Variables (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/collab
JWT_SECRET=your_jwt_secret_key_here
SKIP_MONGODB=true
```

Set `SKIP_MONGODB=true` to run without MongoDB (uses in-memory storage).
