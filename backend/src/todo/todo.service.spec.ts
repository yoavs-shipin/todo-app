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

  it('creates a todo with tagIds', () => {
    const todo = service.create({ title: 'Tagged', tagIds: ['tag1', 'tag2'] });
    expect(todo.tagIds).toEqual(['tag1', 'tag2']);
  });

  it('creates a todo with empty tagIds by default', () => {
    const todo = service.create({ title: 'No tags' });
    expect(todo.tagIds).toEqual([]);
  });

  it('updates tagIds on a todo', () => {
    const todo = service.create({ title: 'Task', tagIds: ['tag1'] });
    const updated = service.update(todo.id, { tagIds: ['tag2', 'tag3'] });
    expect(updated.tagIds).toEqual(['tag2', 'tag3']);
  });

  it('filters by tagId', () => {
    service.create({ title: 'A', tagIds: ['tag1', 'tag2'] });
    service.create({ title: 'B', tagIds: ['tag2'] });
    service.create({ title: 'C', tagIds: ['tag3'] });

    const filtered = service.findAll({ tagId: 'tag2' });
    expect(filtered).toHaveLength(2);
    expect(filtered.map((t) => t.title).sort()).toEqual(['A', 'B']);
  });
});
