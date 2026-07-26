import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Todo, TodoPriority } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private todos: Map<string, Todo> = new Map();

  findAll(filter?: {
    completed?: boolean;
    priority?: TodoPriority;
    tagId?: string;
  }): Todo[] {
    let results = Array.from(this.todos.values());

    if (filter?.completed !== undefined) {
      results = results.filter((t) => t.completed === filter.completed);
    }
    if (filter?.priority) {
      results = results.filter((t) => t.priority === filter.priority);
    }
    if (filter?.tagId) {
      results = results.filter((t) => t.tagIds.includes(filter.tagId!));
    }

    return results.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  findOne(id: string): Todo {
    const todo = this.todos.get(id);
    if (!todo) throw new NotFoundException(`Todo ${id} not found`);
    return todo;
  }

  create(dto: CreateTodoDto): Todo {
    const now = new Date();
    const todo: Todo = {
      id: uuidv4(),
      title: dto.title,
      description: dto.description ?? '',
      completed: false,
      priority: dto.priority ?? TodoPriority.MEDIUM,
      tagIds: dto.tagIds ?? [],
      createdAt: now,
      updatedAt: now,
    };
    this.todos.set(todo.id, todo);
    return todo;
  }

  update(id: string, dto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    const updated: Todo = {
      ...todo,
      ...Object.fromEntries(
        Object.entries(dto).filter(([, v]) => v !== undefined),
      ),
      updatedAt: new Date(),
    };
    this.todos.set(id, updated);
    return updated;
  }

  remove(id: string): void {
    if (!this.todos.delete(id)) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
  }

  /** Toggle completed status and return the updated todo. */
  toggle(id: string): Todo {
    const todo = this.findOne(id);
    return this.update(id, { completed: !todo.completed });
  }
}
