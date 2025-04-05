
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskType } from '../types/Task';
import { toast } from "sonner";

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  clearAllTasks: () => void;
  editingTask: Task | null;
  setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
  filteredTasks: Task[];
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setFilterType: React.Dispatch<React.SetStateAction<TaskType | ''>>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<TaskType | ''>('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Error parsing tasks from localStorage', error);
        localStorage.removeItem('tasks');
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks based on search term and filter type
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || task.type === filterType;
    return matchesSearch && matchesType;
  });

  // Add a new task
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const timestamp = new Date().toISOString();
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
    toast.success('Task added successfully!');
  };

  // Update an existing task
  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id 
          ? { ...updatedTask, updatedAt: new Date().toISOString() } 
          : task
      )
    );
    setEditingTask(null);
    toast.success('Task updated successfully!');
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    if (editingTask?.id === id) {
      setEditingTask(null);
    }
    toast.success('Task deleted successfully!');
  };

  // Clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
    setEditingTask(null);
    toast.success('All tasks cleared!');
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    clearAllTasks,
    editingTask,
    setEditingTask,
    filteredTasks,
    setSearchTerm,
    setFilterType,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
