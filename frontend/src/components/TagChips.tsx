import type { Tag } from '../types';
import styles from './TagChips.module.css';

interface Props {
  tags: Tag[];
}

function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r + g + b) / 3 > 128;
}

export function TagChips({ tags }: Props) {
  if (tags.length === 0) return null;

  return (
    <div className={styles.chips}>
      {tags.map((tag) => (
        <span
          key={tag.id}
          className={styles.chip}
          style={{
            backgroundColor: tag.color,
            color: isLightColor(tag.color) ? '#1a1a1a' : '#ffffff',
          }}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}
