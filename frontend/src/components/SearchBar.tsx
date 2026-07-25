import styles from './SearchBar.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchBar({ value, onChange, onClear }: Props) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search todos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={onClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
