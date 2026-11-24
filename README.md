# LampX

A starter full-stack authentication app using React + Vite, Express, MongoDB, bcrypt password hashing, JWT in an HTTP-only cookie, Helmet, CORS and rate limiting.

## Requirements
- Node.js and npm
- MongoDB running locally, or a MongoDB connection string

## Setup
1. Extract this ZIP.
2. Open a terminal in the folder containing `package.json`.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Set a long random `JWT_SECRET` in `.env`.
6. Make sure MongoDB is running.
7. Run `npm run dev`.
8. Open http://localhost:5173

The API runs at http://localhost:5000.

## Important
- Never commit `.env`.
- Use a strong, unique JWT secret.
- For production, configure HTTPS, a production database, and appropriate cookie/CORS settings.
- This is a learning starter, not a production security audit.