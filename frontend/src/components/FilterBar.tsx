import type { Priority, Tag } from '../types';
import styles from './FilterBar.module.css';

type Filter = 'all' | 'active' | 'completed';

interface Props {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  priority: Priority | '';
  onPriorityChange: (p: Priority | '') => void;
  tags: Tag[];
  tagFilter: string;
  onTagFilterChange: (tagId: string) => void;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export function FilterBar({ filter, onFilterChange, priority, onPriorityChange, tags, tagFilter, onTagFilterChange }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.tabs}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`${styles.tab} ${filter === f.value ? styles.active : ''}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <select
        className={styles.select}
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as Priority | '')}
      >
        <option value="">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select
        className={styles.select}
        value={tagFilter}
        onChange={(e) => onTagFilterChange(e.target.value)}
      >
        <option value="">All tags</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>{tag.name}</option>
        ))}
      </select>
    </div>
  );
}
