import { useState } from 'react';
import type { Priority } from '../types';
import styles from './AddTodoForm.module.css';

interface Props {
  onAdd: (title: string, description: string, priority: Priority, dueDate?: string) => void;
}

export function AddTodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim(), priority, dueDate || undefined);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setExpanded(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          className={styles.input}
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <button className={styles.addBtn} type="submit" disabled={!title.trim()}>
          Add
        </button>
      </div>

      <button
        className={styles.expandBtn}
        type="button"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Less options' : 'More options'}
      </button>

      {expanded && (
        <div className={styles.options}>
          <textarea
            className={styles.textarea}
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
          <select
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>
          <label className={styles.dateLabel}>
            Due date
            <input
              className={styles.dateInput}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
        </div>
      )}
    </form>
  );
}
