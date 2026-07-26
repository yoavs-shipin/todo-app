import { useState } from 'react';
import type { Priority, Tag } from '../types';
import { TagPicker } from './TagPicker';
import styles from './AddTodoForm.module.css';

interface Props {
  tags: Tag[];
  onAdd: (title: string, description: string, priority: Priority, tagIds: string[]) => void;
}

export function AddTodoForm({ tags, onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim(), priority, selectedTagIds);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setSelectedTagIds([]);
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
          <TagPicker tags={tags} selected={selectedTagIds} onChange={setSelectedTagIds} />
        </div>
      )}
    </form>
  );
}
