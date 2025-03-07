import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from 'lucide-react';
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const TaskPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`https://task-calender-backend-git-main-nithin2023-creators-projects.vercel.app/tasks?date=${date}`).then((res) => {
      setTasks(res.data);
    });
  }, [date]);

  // Format date for display
  const formatDate = (dateStr) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-2 sm:p-5 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="btn-primary flex items-center gap-2 text-sm sm:text-base w-fit"
          aria-label="Back to calendar"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h2 className="text-lg sm:text-2xl font-medium">
          Tasks for {formatDate(date)}
        </h2>
      </div>
      <TaskForm date={date} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TaskPage;