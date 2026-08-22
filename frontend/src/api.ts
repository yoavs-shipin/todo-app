import type { Todo, Priority } from './types';

const BASE = '/todos';

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${res.status}: ${body}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  list: (filter?: { completed?: boolean; priority?: Priority }) => {
    const params = new URLSearchParams();
    if (filter?.completed !== undefined)
      params.set('completed', String(filter.completed));
    if (filter?.priority) params.set('priority', filter.priority);
    const qs = params.toString();
    return request<Todo[]>(`${BASE}${qs ? `?${qs}` : ''}`);
  },

  create: (data: { title: string; description?: string; priority?: Priority; dueDate?: string }) =>
    request<Todo>(BASE, { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: Partial<Pick<Todo, 'title' | 'description' | 'completed' | 'priority' | 'dueDate'>>) =>
    request<Todo>(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  toggle: (id: string) =>
    request<Todo>(`${BASE}/${id}/toggle`, { method: 'PATCH' }),

  remove: (id: string) =>
    request<void>(`${BASE}/${id}`, { method: 'DELETE' }),
};
