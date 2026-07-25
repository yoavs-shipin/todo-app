# Todo App

Full-stack todo list application with **NestJS** backend and **React** frontend.

## Features

- Create, read, update, delete todos
- Toggle completion status
- Filter by status (all / active / done)
- Filter by priority (high / medium / low)
- Inline editing (double-click or edit button)
- Dark theme UI

## Quick Start

```bash
# Install dependencies
npm run install:all

# Start both servers (backend :3000, frontend :5173)
npm run dev
```

## Project Structure

```
backend/    — NestJS REST API (in-memory storage)
frontend/   — React + Vite + TypeScript
```

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /todos | List all (query: completed, priority) |
| GET | /todos/:id | Get one |
| POST | /todos | Create |
| PUT | /todos/:id | Update |
| PATCH | /todos/:id/toggle | Toggle completed |
| DELETE | /todos/:id | Delete |
