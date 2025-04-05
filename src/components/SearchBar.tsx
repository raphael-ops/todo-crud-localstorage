
import React from "react";
import { Input } from "@/components/ui/input";
import { useTaskContext } from "@/contexts/TaskContext";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskType } from "@/types/Task";

export default function SearchBar() {
  const { setSearchTerm, setFilterType } = useTaskContext();
  const [localSearchTerm, setLocalSearchTerm] = React.useState("");
  const [localFilterType, setLocalFilterType] = React.useState<TaskType | "">("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setLocalSearchTerm("");
    setSearchTerm("");
  };

  const handleFilterChange = (value: TaskType | "") => {
    setLocalFilterType(value);
    setFilterType(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search tasks..."
          value={localSearchTerm}
          onChange={handleSearchChange}
          className="pl-10 pr-10"
        />
        {localSearchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </button>
        )}
      </div>

      <div className="w-full md:w-48">
        <Select
          value={localFilterType}
          onValueChange={handleFilterChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="study">Study</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
