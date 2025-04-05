
import React from "react";
import { Task } from "@/types/Task";
import { Button } from "@/components/ui/button";
import { useTaskContext } from "@/contexts/TaskContext";
import { Edit, Trash, Briefcase, BookOpen, User } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, setEditingTask } = useTaskContext();

  const handleEdit = () => {
    setEditingTask(task);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getTypeIcon = () => {
    switch (task.type) {
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
    <div
      className={`p-5 rounded-lg task-card-shadow animate-zoom-in ${task.backgroundColor}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg line-clamp-2">{task.name}</h3>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500">
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Task</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this task? This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-3">
        <div className="flex items-center mr-3">
          {getTypeIcon()}
          <span className="ml-1 capitalize">{task.type}</span>
        </div>
        <div className="text-xs">
          {format(new Date(task.updatedAt), "MMM d, yyyy")}
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-700 mb-2 line-clamp-3">{task.description}</p>
      )}
    </div>
  );
}
