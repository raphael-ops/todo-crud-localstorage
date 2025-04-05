
export type TaskType = 'personal' | 'work' | 'study';

export interface Task {
  id: string;
  name: string;
  type: TaskType;
  description: string;
  backgroundColor: string;
  createdAt: string;
  updatedAt: string;
}

export const taskBackgroundColors = [
  { value: 'bg-todo-blue', label: 'Blue' },
  { value: 'bg-todo-green', label: 'Green' },
  { value: 'bg-todo-yellow', label: 'Yellow' },
  { value: 'bg-todo-orange', label: 'Orange' },
  { value: 'bg-todo-purple', label: 'Purple' },
  { value: 'bg-todo-pink', label: 'Pink' },
  { value: 'bg-todo-peach', label: 'Peach' },
];
