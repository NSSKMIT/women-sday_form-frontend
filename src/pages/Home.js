import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";
import { Calendar as CalendarIcon, CheckCircle, Clock, Code } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleDateClick = (date) => {
    navigate(`/tasks/${date}`);
  };

  return (
    <div className="p-2 sm:p-5 min-h-screen flex flex-col">
      {/* Main Content */}
      <div>
        {/* Enhanced Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <CalendarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              <div className="absolute -top-1 -right-1">
                <div className="relative">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600">
                Task Tracker
              </span>
            </h1>
          </div>
          
        

          {/* Subtitle with animation */}
          <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Your daily companion for efficient task management and productivity tracking
          </p>
        </div>

        <Calendar onDateClick={handleDateClick} />
      </div>

      {/* Developer Credit Footer */}
      <div className="mt-auto pt-8 pb-4">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors">
          <Code className="w-4 h-4" />
          
            Developed by{" "}
            <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Nithin
            </span>
          
        </div>
      </div>
    </div>
  );
};

export default Home;