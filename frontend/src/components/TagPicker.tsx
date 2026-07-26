import type { Tag } from '../types';
import styles from './TagPicker.module.css';

interface Props {
  tags: Tag[];
  selected: string[];
  onChange: (tagIds: string[]) => void;
}

export function TagPicker({ tags, selected, onChange }: Props) {
  const handleToggle = (tagId: string) => {
    if (selected.includes(tagId)) {
      onChange(selected.filter((id) => id !== tagId));
    } else {
      onChange([...selected, tagId]);
    }
  };

  if (tags.length === 0) return null;

  return (
    <div className={styles.picker}>
      {tags.map((tag) => (
        <label key={tag.id} className={styles.option}>
          <input
            type="checkbox"
            checked={selected.includes(tag.id)}
            onChange={() => handleToggle(tag.id)}
          />
          <span className={styles.dot} style={{ backgroundColor: tag.color }} />
          <span className={styles.name}>{tag.name}</span>
        </label>
      ))}
    </div>
  );
}
