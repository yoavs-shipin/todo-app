export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}
