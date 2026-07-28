# Todo App — Regression Test Runbook

Manual/browser-based regression checklist. Run through these before each release.

**Prerequisites:**
- Backend running on `http://localhost:3000`
- Frontend running on `http://localhost:5173`
- Start with an empty todo list (restart backend to clear data)

---

## 1. Page Load

- [ ] App loads at `http://localhost:5173` without console errors
- [ ] Header shows "Todo List" and "0 tasks remaining"
- [ ] Empty state message "No todos yet. Add one above!" is displayed
- [ ] Dark theme renders correctly (dark background, light text)

## 2. Create Todo

- [ ] Type a title and click "Add" — todo appears in the list
- [ ] "Add" button is disabled when the input is empty
- [ ] Header updates to "1 task remaining"
- [ ] New todo shows priority badge "Med" (default medium priority)
- [ ] Click "More options" — description textarea and priority dropdown appear
- [ ] Create a todo with description and "High" priority — both render correctly
- [ ] Click "Less options" — extra fields collapse
- [ ] After adding, the input field clears and extra options collapse

## 3. Toggle Completion

- [ ] Click the checkbox on an incomplete todo — it becomes completed
- [ ] Completed todo shows: filled checkbox, strikethrough title, reduced opacity
- [ ] "tasks remaining" count decreases by 1
- [ ] Click the checkbox again — todo reverts to incomplete
- [ ] Count increases back

## 4. Inline Editing

- [ ] Double-click a todo title — inline edit form appears with current values
- [ ] Change the title and press Enter — title updates, edit mode closes
- [ ] Press Escape — edit is cancelled, original values restored
- [ ] Click the pencil (edit) icon — same edit form appears
- [ ] Edit description field and click "Save" — description updates
- [ ] Click "Cancel" — changes discarded

## 5. Delete Todo

- [ ] Hover over a todo — edit and delete (X) icons appear
- [ ] Click the X icon — todo is removed from the list
- [ ] "tasks remaining" count updates correctly
- [ ] Delete the last todo — empty state message reappears

## 6. Filter by Status

- [ ] Create 3 todos, complete 1. Default "All" tab shows all 3
- [ ] Click "Active" tab — only the 2 incomplete todos are shown
- [ ] Click "Done" tab — only the 1 completed todo is shown
- [ ] Click "All" tab — all 3 are shown again

## 7. Filter by Priority

- [ ] Create todos with low, medium, and high priority
- [ ] Select "High" from the priority dropdown — only high-priority todos shown
- [ ] Select "Low" — only low-priority todos shown
- [ ] Select "All priorities" — all todos shown

## 8. Combined Filters

- [ ] Set status filter to "Active" and priority to "High" — only active high-priority todos shown
- [ ] Change status to "All" — all high-priority todos shown (completed and active)
- [ ] Reset priority to "All priorities" — full list restored

## 9. Priority Badges

- [ ] High-priority todo shows red "High" badge
- [ ] Medium-priority todo shows amber "Med" badge
- [ ] Low-priority todo shows green "Low" badge

## 10. Health Check API

- [ ] `GET http://localhost:3000/health` returns HTTP 200
- [ ] Response body is JSON `{ "status": "ok" }`
- [ ] Endpoint responds while the backend is running (no auth required)

## 11. API Error Handling

- [ ] Stop the backend, try to add a todo — UI does not crash (check console for error)
- [ ] Restart the backend — app recovers on next action/filter change
- [ ] `GET /todos/nonexistent-uuid` returns 404 JSON response
- [ ] `POST /todos` with empty body returns 400 with validation errors
- [ ] `POST /todos` with `{"title": "x", "priority": "invalid"}` returns 400

## 12. Responsive Layout

- [ ] Resize browser to 375px width — layout remains usable
- [ ] Add form, filter bar, and todo items stack properly on narrow screens
- [ ] No horizontal overflow at any viewport width

---

**Last verified:** —
