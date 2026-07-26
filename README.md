# Todo App

Full-stack todo list application — **NestJS** backend + **React** frontend.

## Quick Start

```bash
# Install all dependencies (root + backend + frontend)
npm run install:all

# Start both servers
npm run dev
```

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

## Project Structure

```
├── agent-context.json           # Documentation file registry
├── backend/                     # NestJS REST API
│   └── src/
│       ├── main.ts              # Bootstrap, CORS, validation pipe
│       ├── app.module.ts        # Root module
│       ├── tag/                 # Tag CRUD module
│       └── todo/
│           ├── todo.module.ts
│           ├── todo.entity.ts   # Todo interface + TodoPriority enum
│           ├── todo.controller.ts
│           ├── todo.service.ts  # Business logic, in-memory store
│           ├── todo.service.spec.ts
│           └── dto/             # Request validation DTOs
├── frontend/                    # React + Vite + TypeScript
│   └── src/
│       ├── App.tsx              # Root component, state, data fetching, tag create UI
│       ├── api.ts               # HTTP client wrapper (todos + tags)
│       ├── types.ts             # Shared TypeScript types (Todo, Tag)
│       └── components/
│           ├── AddTodoForm.tsx   # Create todo form
│           ├── FilterBar.tsx    # Status tabs + priority + tag dropdowns
│           ├── TagChips.tsx     # Colored tag pills
│           ├── TagPicker.tsx    # Tag multi-select checkboxes
│           └── TodoItem.tsx     # Single todo row with edit/delete
└── docs/
    ├── PRD.md                   # Product requirements
    ├── spec.md                  # Technical specification
    └── regression-test-runbook.md
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start backend + frontend concurrently |
| `npm run dev:backend` | Backend only (watch mode) |
| `npm run dev:frontend` | Frontend only |
| `npm run install:all` | Install deps in root, backend, and frontend |
| `npm run build` | Production build (both) |
| `npm test` | Run backend unit tests |

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | List todos (query: `completed`, `priority`, `tagId`) |
| GET | `/todos/:id` | Get single todo |
| POST | `/todos` | Create todo (`title` required; optional `tagIds`) |
| PUT | `/todos/:id` | Update todo fields |
| PATCH | `/todos/:id/toggle` | Toggle completed status |
| DELETE | `/todos/:id` | Delete todo (204) |
| GET | `/tags` | List tags |
| POST | `/tags` | Create tag (`name`, `color` as `#RRGGBB`) |
| PUT | `/tags/:id` | Update tag |
| DELETE | `/tags/:id` | Delete tag (204) |

## Tech Stack

- **Backend:** NestJS 11, TypeScript, class-validator, uuid
- **Frontend:** React 19, Vite 6, TypeScript, CSS Modules
- **Testing:** Jest + ts-jest (17 unit tests)
- **Storage:** In-memory (no database — resets on restart)

## Documentation

- **[PRD](docs/PRD.md)** — features, user flows, data model, validation rules
- **[Technical Spec](docs/spec.md)** — architecture, API contracts, technology decisions
- **[Regression Runbook](docs/regression-test-runbook.md)** — browser-based test checklist
