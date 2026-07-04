# AI Task Manager

A full-stack Task Manager Web Application built with React, Flask, and MySQL. The application allows users to manage tasks efficiently with authentication, AI-powered task suggestions, dark mode, filtering, and responsive design.

---

## Features

- User Signup & Login (JWT Authentication)
- Create, Read, Update, Delete Tasks
- Filter Tasks by Status and Priority
- Responsive UI for Desktop and Mobile
- Dark Mode Toggle
- AI Task Suggestion (Google Gemini API)
- Form Validation
- Toast Notifications
- MySQL Database Integration
- REST API using Flask

---

## Tech Stack

### Frontend

- React (Vite)
- React Router
- Axios
- Tailwind CSS
- React Toastify

### Backend

- Python
- Flask
- Flask SQLAlchemy
- Flask JWT Extended
- Flask Bcrypt
- Flask CORS

### Database

- MySQL

### AI

- Google Gemini API (REST API)

---

## Project Structure

```
Task_Manager
│
├── backend
│   ├── routes
│   ├── models
│   ├── utils
│   ├── app.py
│   └── ...
│
└── frontend
    ├── src
    ├── components
    ├── pages
    └── ...
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Chandana-Dhage/Task_Manager_Web_App.git
```

---

### 2. Backend Setup

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate

Windows

```bash
venv\Scripts\activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file

```
HOST=localhost
USER=root
PASSWORD=YOUR_PASSWORD
DATABASE=task_manager

SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

Run the backend

```bash
python app.py
```

Backend runs on

```
http://127.0.0.1:5000
```

---

### 3. Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run Vite

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## API Endpoints

### Authentication

```
POST /api/auth/signup
POST /api/auth/login
```

### Tasks

```
GET /api/tasks
POST /api/tasks
PUT /api/tasks/<id>
DELETE /api/tasks/<id>
```

### AI

```
POST /api/ai/suggest
```

---

## Tech Stack Choices

### React + Vite

Chosen for its fast development server, component-based architecture, and excellent developer experience.

### Flask

Provides a lightweight and flexible backend that integrates well with REST APIs.

### MySQL

Used for reliable relational data storage with SQLAlchemy ORM support.

### Tailwind CSS

Chosen to rapidly build a modern, responsive, and dark mode compatible UI.

### JWT Authentication

Provides secure user authentication and protected API routes.

### Google Gemini API

Used to generate intelligent task descriptions and suggest task priorities based on a short task title.

---

## AI Tools & Resources Used

- Google Gemini API
- Tailwind CSS Documentation
- Flask Documentation
- React Documentation
- SQLAlchemy Documentation

---

## Future Improvements

If given more time, I would add:

- Task search functionality
- Drag-and-drop Kanban board
- Task categories and labels
- Email reminders for due dates
- File attachments
- User profile management
- Dashboard analytics with charts
- Pagination for large task lists
- Docker deployment
- Unit and Integration Testing

---

## Author

Chandana Dhage