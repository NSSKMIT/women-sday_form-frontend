import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";

const statuses = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const TaskForm = ({ date, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = { date, title, description, status };

    try {
      const response = await fetch("https://task-calender-backend-git-main-nithin2023-creators-projects.vercel.app/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks((prev) => [...prev, data]);
      setTitle("");
      setDescription("");
      setIsExpanded(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="w-full max-w-full md:max-w-3xl lg:max-w-4xl mx-auto mt-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative"
        onSubmit={handleSubmit}
      >
        {!isExpanded ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="input-field flex-grow"
              placeholder="Quick add task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
            />
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="btn-primary p-2 sm:p-3"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              className="input-field text-lg sm:text-xl font-medium"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="input-field min-h-[100px]"
              placeholder="Add description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Status</label>
              <select
                className="input-field"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="btn-primary bg-gray-600"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <Check className="w-5 h-5" /> Add Task
              </button>
            </div>
          </div>
        )}
      </motion.form>
    </div>
  );
};

export default TaskForm;