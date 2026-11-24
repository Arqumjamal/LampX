# LampX — Full-Stack Authentication System

A full-stack authentication application built with React, Node.js, Express.js, and MongoDB.

## About the Project

LampX is a web development project focused on understanding and implementing authentication through a frontend and backend architecture.

The project demonstrates how different technologies work together to handle user authentication and database operations.

## Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend |
| Vite | Development server and build tool |
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | Database modeling |
| JWT | Token-based authentication |
| bcryptjs | Password hashing |

## Project Structure

```text
LampX/
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── server.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Arqumjamal/LampX.git
```

### 2. Navigate to the project

```bash
cd LampX
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create your `.env` file using `.env.example` as a reference.

Add your own configuration values. Never publish real secrets.

### 5. Start the application

```bash
npm run dev
```

Frontend: http://localhost:5173/

Backend: http://localhost:5000/

## Learning Objectives

- Full-stack application architecture
- Frontend and backend communication
- REST API development
- Authentication concepts
- Database integration
- Password security
- Backend middleware

## Future Improvements

- Expand authentication features
- Improve input validation
- Add automated testing
- Improve error handling
- Prepare for production deployment

## Author

**Arqum Jamal**

Software Engineering Student | Full-Stack Developer

GitHub: https://github.com/Arqumjamal

---

This project is part of my continuous learning journey in software engineering and full-stack development.
## Screenshots

### LampX Homepage

![LampX Homepage](screenshots/lampx-homepage.png)