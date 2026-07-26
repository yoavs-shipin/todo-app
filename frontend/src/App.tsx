import { useEffect, useState, useCallback } from 'react';
import type { Todo, Priority, Tag } from './types';
import { api } from './api';
import { TodoItem } from './components/TodoItem';
import { AddTodoForm } from './components/AddTodoForm';
import { FilterBar } from './components/FilterBar';
import styles from './App.module.css';

type Filter = 'all' | 'active' | 'completed';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | ''>('');
  const [tagFilter, setTagFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3b82f6');
  const [showTagForm, setShowTagForm] = useState(false);

  const loadTags = useCallback(async () => {
    const data = await api.tags.list();
    setTags(data);
  }, []);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  const load = useCallback(async () => {
    const params: { completed?: boolean; priority?: Priority; tagId?: string } = {};
    if (filter === 'active') params.completed = false;
    if (filter === 'completed') params.completed = true;
    if (priorityFilter) params.priority = priorityFilter;
    if (tagFilter) params.tagId = tagFilter;
    const data = await api.list(params);
    setTodos(data);
    setLoading(false);
  }, [filter, priorityFilter, tagFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (title: string, description: string, priority: Priority, tagIds: string[]) => {
    await api.create({ title, description: description || undefined, priority, tagIds: tagIds.length > 0 ? tagIds : undefined });
    load();
  };

  const handleToggle = async (id: string) => {
    await api.toggle(id);
    load();
  };

  const handleDelete = async (id: string) => {
    await api.remove(id);
    load();
  };

  const handleUpdate = async (id: string, data: Partial<Pick<Todo, 'title' | 'description' | 'priority'>> & { tagIds?: string[] }) => {
    await api.update(id, data);
    load();
  };

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    await api.tags.create({ name: newTagName.trim(), color: newTagColor });
    setNewTagName('');
    setNewTagColor('#3b82f6');
    setShowTagForm(false);
    loadTags();
  };

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Todo List</h1>
        <p className={styles.subtitle}>
          {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
        </p>
      </header>

      <AddTodoForm tags={tags} onAdd={handleAdd} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        priority={priorityFilter}
        onPriorityChange={setPriorityFilter}
        tags={tags}
        tagFilter={tagFilter}
        onTagFilterChange={setTagFilter}
      />

      <div className={styles.tagManagement}>
        <button
          className={styles.manageTagsBtn}
          type="button"
          onClick={() => setShowTagForm(!showTagForm)}
        >
          {showTagForm ? 'Cancel' : '+ New Tag'}
        </button>
        {showTagForm && (
          <form className={styles.tagForm} onSubmit={handleCreateTag}>
            <input
              className={styles.tagInput}
              type="text"
              placeholder="Tag name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
            />
            <input
              className={styles.tagColorInput}
              type="color"
              value={newTagColor}
              onChange={(e) => setNewTagColor(e.target.value)}
            />
            <button className={styles.tagSubmitBtn} type="submit" disabled={!newTagName.trim()}>
              Create
            </button>
          </form>
        )}
      </div>

      <main className={styles.list}>
        {loading ? (
          <p className={styles.empty}>Loading...</p>
        ) : todos.length === 0 ? (
          <p className={styles.empty}>No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              tags={tags}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </main>
    </div>
  );
}
