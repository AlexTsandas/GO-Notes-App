# Go Notes App

A simple full-stack todo app built for practice. Coming from Node.js and Express, I used this project to learn backend development with Go and Fiber v2 and test deployment on Railway.

Create, view, complete, and delete todos through the React frontend, with data stored in MongoDB Atlas. The app is deployed on Railway.

**Live preview:** [Go Notes App](https://go-notes-app-production-4b637812.up.railway.app)

## Tech stack

- **Backend:** Go, Fiber v2.
- **Frontend:** React, TypeScript, Vite, Chakra UI, React Icons, TanStack Query.
- **Database:** MongoDB Atlas.
- **Development:** Air for automatic backend rebuilds.
- **Deployment:** Docker, Railway.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/todos` | List all todos |
| POST | `/api/todos` | Create a todo |
| PATCH | `/api/todos/:id` | Mark a todo as completed |
| DELETE | `/api/todos/:id` | Delete a todo |
