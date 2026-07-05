# Intern Details 

Intern ID: CITS3867 

Name: Nandhini A 

No. of Weeks: 4 Weeks 

# Collab - Task Collaboration Tool

Project name: Collab (Task-collabration tool)

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


<img width="1907" height="965" alt="Image" src="https://github.com/user-attachments/assets/1debb910-cc02-42ae-bf83-0d2a1e1fc7ed" />
<img width="1912" height="967" alt="Image" src="https://github.com/user-attachments/assets/6bb44790-2d8e-4a58-9608-da467c04d7f6" />
<img width="1905" height="962" alt="Image" src="https://github.com/user-attachments/assets/e7a3c862-5023-498f-aeb9-e58baa54ebdd" />
<img width="1832" height="912" alt="Image" src="https://github.com/user-attachments/assets/e7a75c98-362e-4fff-ada9-35cc69fd49b1" />
<img width="1827" height="972" alt="Image" src="https://github.com/user-attachments/assets/02bc2c63-5b3d-499a-a6ca-ba720cbf54d0" />
<img width="1827" height="980" alt="Image" src="https://github.com/user-attachments/assets/09a24016-1ea4-46ff-a42a-cbcb78fc1759" />
<img width="1822" height="977" alt="Image" src="https://github.com/user-attachments/assets/af64a203-2939-46bd-b062-071925e2e6a0" />
<img width="1882" height="962" alt="Image" src="https://github.com/user-attachments/assets/7cf9c8a3-a518-491d-88ac-fd34c6c71f2f" />
