import { NotFoundException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoPriority } from './todo.entity';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
  });

  it('creates a todo with defaults', () => {
    const todo = service.create({ title: 'Test' });
    expect(todo.title).toBe('Test');
    expect(todo.completed).toBe(false);
    expect(todo.priority).toBe(TodoPriority.MEDIUM);
    expect(todo.description).toBe('');
  });

  it('creates a todo with a due date', () => {
    const todo = service.create({
      title: 'Deadline task',
      dueDate: '2026-08-01',
    });
    expect(todo.dueDate).toBe('2026-08-01');
  });

  it('creates a todo without due date defaults to null', () => {
    const todo = service.create({ title: 'No deadline' });
    expect(todo.dueDate).toBeNull();
  });

  it('updates the due date', () => {
    const todo = service.create({ title: 'Task' });
    const updated = service.update(todo.id, { dueDate: '2026-09-01' });
    expect(updated.dueDate).toBe('2026-09-01');
  });

  it('lists all created todos', () => {
    service.create({ title: 'First' });
    service.create({ title: 'Second' });
    const all = service.findAll();
    expect(all).toHaveLength(2);
    expect(all.map((t) => t.title)).toContain('First');
    expect(all.map((t) => t.title)).toContain('Second');
  });

  it('filters by completed status', () => {
    const todo = service.create({ title: 'Task' });
    service.toggle(todo.id);
    expect(service.findAll({ completed: true })).toHaveLength(1);
    expect(service.findAll({ completed: false })).toHaveLength(0);
  });

  it('filters by priority', () => {
    service.create({ title: 'High', priority: TodoPriority.HIGH });
    service.create({ title: 'Low', priority: TodoPriority.LOW });
    expect(service.findAll({ priority: TodoPriority.HIGH })).toHaveLength(1);
  });

  it('filters by search (case-insensitive)', () => {
    service.create({ title: 'Buy groceries' });
    service.create({ title: 'Buy milk' });
    service.create({ title: 'Read book' });
    const results = service.findAll({ search: 'buy' });
    expect(results).toHaveLength(2);
    expect(results.map((t) => t.title)).toEqual(
      expect.arrayContaining(['Buy groceries', 'Buy milk']),
    );
  });

  it('combines search and priority filters', () => {
    service.create({ title: 'Buy groceries', priority: TodoPriority.HIGH });
    service.create({ title: 'Buy milk', priority: TodoPriority.LOW });
    service.create({ title: 'Read book' });
    const results = service.findAll({
      search: 'buy',
      priority: TodoPriority.HIGH,
    });
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('Buy groceries');
  });

  it('returns empty array when search matches nothing', () => {
    service.create({ title: 'Buy groceries' });
    expect(service.findAll({ search: 'nonexistent' })).toEqual([]);
  });

  it('updates a todo', () => {
    const todo = service.create({ title: 'Old' });
    const updated = service.update(todo.id, { title: 'New' });
    expect(updated.title).toBe('New');
  });

  it('toggles completed status', () => {
    const todo = service.create({ title: 'Task' });
    expect(todo.completed).toBe(false);
    const toggled = service.toggle(todo.id);
    expect(toggled.completed).toBe(true);
  });

  it('removes a todo', () => {
    const todo = service.create({ title: 'Task' });
    service.remove(todo.id);
    expect(service.findAll()).toHaveLength(0);
  });

  it('throws on missing todo', () => {
    expect(() => service.findOne('nonexistent')).toThrow(NotFoundException);
  });

  it('clearCompleted removes completed todos and returns deleted count', () => {
    const t1 = service.create({ title: 'One' });
    const t2 = service.create({ title: 'Two' });
    const t3 = service.create({ title: 'Three' });
    service.toggle(t1.id);
    service.toggle(t2.id);

    const result = service.clearCompleted();

    expect(result).toEqual({ deleted: 2 });
    const remaining = service.findAll();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe(t3.id);
  });

  it('clearCompleted returns zero when no completed todos exist', () => {
    service.create({ title: 'Active' });
    expect(service.clearCompleted()).toEqual({ deleted: 0 });
  });
});
