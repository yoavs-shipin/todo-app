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
- [ ] Click "More options" — description textarea, priority dropdown, and due date picker appear
- [ ] Create a todo with description, "High" priority, and a due date — all render correctly
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
- [ ] Edit due date field and click "Save" — due date updates
- [ ] Clear due date in edit mode and save — due date is removed
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

## 9. Due Date

- [ ] Create a todo with a due date via "More options" — due date displays as short date (e.g. "Due: Jul 30")
- [ ] Create a todo with a past due date (incomplete) — due date text appears in red
- [ ] Complete an overdue todo — red styling is removed
- [ ] Todo without a due date shows no due date line

## 10. Search by Title

- [ ] Search input appears above the filter bar with placeholder "Search todos..."
- [ ] Type a partial title — list filters after a short delay (~300ms)
- [ ] Search is case-insensitive (e.g. "buy" matches "Buy groceries")
- [ ] Clear (×) button appears when search text is present
- [ ] Click clear — search resets and full list returns
- [ ] Search with no matches — empty state is shown

## 11. Clear Completed

- [ ] Create 3 todos and complete 2 — "Clear completed (2)" button appears in the filter bar
- [ ] Button is styled as a text link (no background, underline on hover)
- [ ] Click "Clear completed" — completed todos are removed; only the active todo remains
- [ ] Button disappears when no completed todos are in the current view
- [ ] With "Active" filter selected, the clear button is hidden (no completed todos visible)

## 12. Combined Search and Filters

- [ ] Search for a term and set priority to "High" — only high-priority todos matching the search are shown
- [ ] Set status to "Active" while searching — only active todos matching the search are shown
- [ ] Clear search while filters are active — filtered list without search constraint is shown

## 13. Priority Badges

- [ ] High-priority todo shows red "High" badge
- [ ] Medium-priority todo shows amber "Med" badge
- [ ] Low-priority todo shows green "Low" badge

## 14. API Error Handling

- [ ] Stop the backend, try to add a todo — UI does not crash (check console for error)
- [ ] Restart the backend — app recovers on next action/filter change
- [ ] `GET /todos/nonexistent-uuid` returns 404 JSON response
- [ ] `POST /todos` with empty body returns 400 with validation errors
- [ ] `POST /todos` with `{"title": "x", "priority": "invalid"}` returns 400
- [ ] `DELETE /todos/completed` returns `{ "deleted": N }` with count of removed todos

## 15. Responsive Layout

- [ ] Resize browser to 375px width — layout remains usable
- [ ] Add form, filter bar, and todo items stack properly on narrow screens
- [ ] No horizontal overflow at any viewport width

---

**Last verified:** —
