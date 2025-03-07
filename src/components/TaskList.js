import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, Check, X } from 'lucide-react';

const TaskList = ({ tasks, setTasks }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://task-calender-backend-git-main-nithin2023-creators-projects.vercel.app/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditForm(task);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`https://task-calender-backend-git-main-nithin2023-creators-projects.vercel.app/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });
      const updatedTask = await response.json();
      setTasks(prev => prev.map(task => 
        task._id === id ? updatedTask : task
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const formatPriorityText = (priority) => {
    if (!priority) return 'Medium Priority'; // Default value
    return `${priority.charAt(0).toUpperCase()}${priority.slice(1)} Priority`;
  };

  const getCategoryClass = (category) => {
    if (!category) return 'category-tag category-DSA'; // Default value
    return `category-tag category-${category.replace(/\s+/g, '-')}`;
  };

  const getPriorityClass = (priority) => {
    if (!priority) return 'priority-tag priority-medium'; // Default value
    return `priority-tag priority-${priority.toLowerCase()}`;
  };

  return (
    <div className="mt-6 space-y-4">
      <AnimatePresence>
        {tasks && tasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="glass-card"
          >
            {editingId === task._id ? (
              <div className="space-y-3">
                <input
                  className="input-field"
                  value={editForm.title || ''}
                  onChange={e => setEditForm({...editForm, title: e.target.value})}
                />
                <textarea
                  className="input-field min-h-[80px]"
                  value={editForm.description || ''}
                  onChange={e => setEditForm({...editForm, description: e.target.value})}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(task._id)}
                    className="btn-primary p-2"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="btn-primary bg-gray-600 p-2"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{task.title || 'Untitled Task'}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(task)}
                      className="btn-primary p-2"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="btn-primary bg-red-500 p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">{task.description || 'No description provided'}</p>
                <div className="flex flex-wrap gap-2">
                  <span className={getCategoryClass(task.category)}>
                    {task.category || 'DSA'}
                  </span>
                  <span className={getPriorityClass(task.priority)}>
                    {formatPriorityText(task.priority)}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;