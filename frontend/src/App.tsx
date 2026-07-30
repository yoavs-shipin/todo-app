import { useEffect, useState, useCallback } from 'react';
import type { Todo, Priority } from './types';
import { api } from './api';
import { TodoItem } from './components/TodoItem';
import { AddTodoForm } from './components/AddTodoForm';
import { FilterBar } from './components/FilterBar';
import styles from './App.module.css';

type Filter = 'all' | 'active' | 'completed';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | ''>('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const params: { completed?: boolean; priority?: Priority } = {};
    if (filter === 'active') params.completed = false;
    if (filter === 'completed') params.completed = true;
    if (priorityFilter) params.priority = priorityFilter;
    const data = await api.list(params);
    setTodos(data);
    setLoading(false);
  }, [filter, priorityFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (title: string, description: string, priority: Priority) => {
    await api.create({ title, description: description || undefined, priority });
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

  const handleUpdate = async (id: string, data: Partial<Pick<Todo, 'title' | 'description' | 'priority'>>) => {
    await api.update(id, data);
    load();
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

      <AddTodoForm onAdd={handleAdd} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        priority={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />

      <main className={styles.list}>
        {loading ? (
          <p className={styles.empty}>Loading...</p>
        ) : todos.length === 0 ? (
          <p className={styles.empty}>No tasks yet — create your first item.</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
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
