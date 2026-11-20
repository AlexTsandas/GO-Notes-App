# Go Notes App

A simple practice project to learn how to write backend code with Go and Fiber v2 and also test deployment on Railway. I am coming from Node.js and Express and using this project to understand Go handlers, requests, responses, and APIs.

## Progress

- Backend API completed with MongoDB persistence.
- Frontend UI design and components completed using sample data.
- Next: connect the frontend to the backend to list, create, complete, and delete todos from the UI.
- Then: deploy the application on Railway.

## Tech stack

- **Backend:** Go, Fiber v2.
- **Frontend:** React, TypeScript, Vite, Chakra UI, React Icons.
- **Database:** MongoDB Atlas.
- **Development:** Air for automatic backend rebuilds.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/todos` | List all todos |
| POST | `/api/todos` | Create a todo |
| PATCH | `/api/todos/:id` | Mark a todo as completed |
| DELETE | `/api/todos/:id` | Delete a todo |
