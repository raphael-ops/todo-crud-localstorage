
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task, TaskType, taskBackgroundColors } from "@/types/Task";
import { useTaskContext } from "@/contexts/TaskContext";
import { Briefcase, BookOpen, User } from "lucide-react";

interface FormData {
  name: string;
  type: TaskType;
  description: string;
  backgroundColor: string;
}

export default function TaskForm() {
  const { addTask, updateTask, editingTask, setEditingTask } = useTaskContext();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      type: "personal",
      description: "",
      backgroundColor: "bg-todo-purple",
    },
  });

  const selectedColor = watch("backgroundColor");
  const selectedType = watch("type");

  // Set form values when editing a task
  useEffect(() => {
    if (editingTask) {
      setValue("name", editingTask.name);
      setValue("type", editingTask.type);
      setValue("description", editingTask.description);
      setValue("backgroundColor", editingTask.backgroundColor);
    }
  }, [editingTask, setValue]);

  const onSubmit = (data: FormData) => {
    if (editingTask) {
      updateTask({
        ...editingTask,
        ...data,
      });
    } else {
      addTask(data);
    }
    reset();
  };

  const handleCancel = () => {
    setEditingTask(null);
    reset();
  };

  const getTypeIcon = (type: TaskType) => {
    switch (type) {
      case "work":
        return <Briefcase className="h-4 w-4" />;
      case "study":
        return <BookOpen className="h-4 w-4" />;
      case "personal":
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border rounded-lg shadow-sm bg-white animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>
      
      <div className="space-y-4">
        {/* Task Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Task Name*
          </label>
          <Input
            id="name"
            {...register("name", { required: "Task name is required" })}
            className={errors.name ? "border-red-500" : ""}
            placeholder="Enter task name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Task Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-1">
            Task Type*
          </label>
          <Select
            value={selectedType}
            onValueChange={(value: TaskType) => setValue("type", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select task type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Personal</span>
                </div>
              </SelectItem>
              <SelectItem value="work">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Work</span>
                </div>
              </SelectItem>
              <SelectItem value="study">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Study</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Task Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Enter task description (optional)"
            className="min-h-[100px]"
          />
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Background Color
          </label>
          <div className="flex flex-wrap gap-2">
            {taskBackgroundColors.map((colorOption) => (
              <div
                key={colorOption.value}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all ${
                  colorOption.value
                } ${
                  selectedColor === colorOption.value
                    ? "border-primary scale-110"
                    : "border-transparent hover:scale-105"
                }`}
                onClick={() => setValue("backgroundColor", colorOption.value)}
                title={colorOption.label}
              />
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-2 pt-2">
          <Button type="submit" className="flex-1">
            {editingTask ? "Update Task" : "Add Task"}
          </Button>
          {editingTask && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
