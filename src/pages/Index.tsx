
import React from "react";
import { TaskProvider } from "@/contexts/TaskContext";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import SearchBar from "@/components/SearchBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8 mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">Vivid To-Do</h1>
          <p className="text-gray-600">Organize your tasks with style</p>
        </header>

        <TaskProvider>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sidebar with form */}
              <div className="lg:col-span-4">
                <TaskForm />
              </div>

              {/* Main content */}
              <div className="lg:col-span-8">
                <SearchBar />
                <TaskList />
              </div>
            </div>
          </div>
        </TaskProvider>
      </div>
    </div>
  );
};

export default Index;
