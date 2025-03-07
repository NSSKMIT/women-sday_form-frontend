import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  isSameMonth,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const Calendar = ({ onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const years = Array.from(
    { length: 11 }, 
    (_, i) => currentDate.getFullYear() - 5 + i
  );

  const handlePrevMonth = () => setCurrentDate(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));
  
  const handleYearChange = (year) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
  };

  const handleMonthChange = (month) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    setCurrentDate(newDate);
  };

  return (
    <div className="w-full max-w-full md:max-w-3xl lg:max-w-4xl mx-auto">
      <div className="glass-card">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">Task Calendar</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevMonth}
              className="btn-primary p-2 sm:p-3"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex gap-2">
              <select
                value={currentDate.getMonth()}
                onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                className="month-selector text-sm sm:text-base py-1.5 px-2 sm:py-2 sm:px-3"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {format(new Date(2024, i, 1), 'MMMM')}
                  </option>
                ))}
              </select>

              <select
                value={currentDate.getFullYear()}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="month-selector text-sm sm:text-base py-1.5 px-2 sm:py-2 sm:px-3"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleNextMonth}
              className="btn-primary p-2 sm:p-3"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="px-1 sm:px-4">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-blue-300 text-xs sm:text-sm font-medium py-2">
                {window.innerWidth > 640 ? day : day.charAt(0)}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
            {Array.from({ length: startDate.getDay() }).map((_, index) => (
              <div key={`empty-start-${index}`} className="aspect-square" />
            ))}

            {days.map((date) => {
              const formattedDate = format(date, 'yyyy-MM-dd');
              const isCurrentMonth = isSameMonth(date, currentDate);
              const isToday = format(new Date(), 'yyyy-MM-dd') === formattedDate;
              
              return (
                <button
                  key={formattedDate}
                  onClick={() => onDateClick(formattedDate)}
                  className={`
                    aspect-square glass-card flex items-center justify-center
                    text-xs sm:text-sm md:text-base
                    transition-all duration-200
                    ${isCurrentMonth ? 'hover:bg-blue-600/20' : 'opacity-40'}
                    ${isToday ? 'ring-2 ring-blue-400' : ''}
                  `}
                >
                  {format(date, 'd')}
                </button>
              );
            })}

            {Array.from({ length: 6 - endDate.getDay() }).map((_, index) => (
              <div key={`empty-end-${index}`} className="aspect-square" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;