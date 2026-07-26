import { useState } from 'react';
import type { Todo, Priority, Tag } from '../types';
import { TagChips } from './TagChips';
import { TagPicker } from './TagPicker';
import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Pick<Todo, 'title' | 'description' | 'priority'>> & { tagIds?: string[] }) => void;
}

const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'High',
  medium: 'Med',
  low: 'Low',
};

export function TodoItem({ todo, tags, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description);
  const [editTagIds, setEditTagIds] = useState<string[]>(todo.tagIds ?? []);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      tagIds: editTagIds,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDesc(todo.description);
    setEditTagIds(todo.tagIds ?? []);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      <button
        className={styles.checkbox}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className={styles.content}>
        {editing ? (
          <div className={styles.editForm} onKeyDown={handleKeyDown}>
            <input
              className={styles.editInput}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
            />
            <input
              className={styles.editInput}
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Description"
            />
            <TagPicker tags={tags} selected={editTagIds} onChange={setEditTagIds} />
            <div className={styles.editActions}>
              <button className={styles.saveBtn} onClick={handleSave}>Save</button>
              <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <span className={styles.title} onDoubleClick={() => setEditing(true)}>
              {todo.title}
            </span>
            {todo.description && (
              <span className={styles.description}>{todo.description}</span>
            )}
            <TagChips tags={tags.filter((t) => (todo.tagIds ?? []).includes(t.id))} />
          </>
        )}
      </div>

      <span className={`${styles.priority} ${styles[todo.priority]}`}>
        {PRIORITY_LABELS[todo.priority]}
      </span>

      <div className={styles.actions}>
        {!editing && (
          <button
            className={styles.editBtn}
            onClick={() => setEditing(true)}
            aria-label="Edit"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 2l2 2-7 7H3v-2l7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(todo.id)}
          aria-label="Delete"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
