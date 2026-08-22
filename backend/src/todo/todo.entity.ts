export enum TodoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: TodoPriority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
