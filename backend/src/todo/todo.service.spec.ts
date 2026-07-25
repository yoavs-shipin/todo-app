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
});
