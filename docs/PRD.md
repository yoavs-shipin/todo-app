# Todo App — Product Requirements Document

## Overview

A full-stack todo list application for personal task management. Users create, organize, and track tasks with priority levels, colored tags, and completion status through a web UI backed by a REST API.

## User Personas

| Persona | Description |
|---------|-------------|
| Individual user | Manages personal tasks; needs quick add, easy prioritization, and filtered views |

## Features

### F1 — Create Todo

- User enters a title (required) and optionally a description, priority level, and tags
- Priority defaults to `medium` if not specified
- New todos start as incomplete (`completed: false`)
- The form has an expandable "More options" section for description, priority, and tag selection

### F2 — View Todos

- All todos display in a single list, sorted newest-first
- Each item shows: title, description (if set), colored tag chips (if any), priority badge, completion checkbox
- Active task count displayed in the header ("N tasks remaining")
- Empty state shown when no todos match the current filters

### F3 — Edit Todo

- Inline editing via double-click on the title or the edit button
- Editable fields: title, description, tags
- Save with Enter, cancel with Escape
- Edit/delete buttons appear on hover

### F4 — Delete Todo

- Delete button (X icon) on each item, visible on hover
- Immediate deletion, no confirmation dialog
- Returns 204 No Content

### F5 — Toggle Completion

- Checkbox on each item toggles `completed` status
- Completed items show strikethrough title and reduced opacity
- Checkbox fills with accent color when checked

### F6 — Filter by Status

- Tab bar with three options: All, Active, Done
- Filters are applied server-side via the `completed` query parameter
- Default filter: All

### F7 — Filter by Priority

- Dropdown selector: All priorities, High, Medium, Low
- Filters are applied server-side via the `priority` query parameter
- Combinable with status filter

### F8 — Tags

- User creates tags via "+ New Tag" (name + color picker); default color is `#3b82f6`
- Tag names must be unique (case-insensitive) on the server
- Tags display as colored chips on todo items (text color adjusts for contrast)
- User assigns one or more tags when creating a todo (in "More options") or when editing a todo
- Tag filter dropdown: "All tags" plus one option per tag; filters server-side via `tagId` query parameter
- Combinable with status and priority filters

## API Surface

| Method | Endpoint | Request Body | Response | Description |
|--------|----------|-------------|----------|-------------|
| GET | `/todos` | — | `Todo[]` | List todos; query: `completed` (bool), `priority` (enum) |
| GET | `/todos/:id` | — | `Todo` | Get single todo |
| POST | `/todos` | `{ title, description?, priority? }` | `Todo` | Create todo |
| PUT | `/todos/:id` | `{ title?, description?, completed?, priority? }` | `Todo` | Update todo |
| PATCH | `/todos/:id/toggle` | — | `Todo` | Toggle completed |
| DELETE | `/todos/:id` | — | 204 | Delete todo |

## Data Model

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | UUID string | auto | — | Unique identifier |
| `title` | string | yes | — | Task title |
| `description` | string | no | `""` | Optional details |
| `completed` | boolean | no | `false` | Completion status |
| `priority` | enum: `low`, `medium`, `high` | no | `medium` | Priority level |
| `createdAt` | ISO datetime | auto | now | Creation timestamp |
| `updatedAt` | ISO datetime | auto | now | Last update timestamp |

## Validation Rules

- `title` is required and must be a non-empty string
- `priority` must be one of: `low`, `medium`, `high`
- `completed` must be a boolean
- Unknown fields are stripped (whitelist validation)

## UI Design

- Dark theme (slate palette with indigo accent)
- Single-page layout, max-width 640px, centered
- CSS Modules for component-scoped styling
- Priority badges: red (high), amber (medium), green (low)
- Responsive — works on mobile widths

## Non-functional Requirements

- In-memory storage (no database; data resets on server restart)
- CORS enabled for `http://localhost:5173`
- Vite dev server proxies `/todos` to the backend
- Request validation via `class-validator` DTOs
