import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Using Lucide React for arrows

interface AttendanceEntry {
  _id: string;
  userId: string;
  startTime: string; // ISO 8601 string, e.g., "2025-06-06T09:00:00.000Z"
  endTime: string | null;
  status: 'Present' | 'Leave' | 'Absent' | 'Holiday' | string; // Extend as needed
  reason: string;
  __v: number;
}

interface PerformanceCalendarProps {
  attendenceRecord: AttendanceEntry[];
}

const PerformanceCalendar: React.FC<PerformanceCalendarProps> = ({ attendenceRecord }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // State for the currently displayed month/year

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Process attendance record into a map for easier lookup: 'YYYY-MM-DD' -> status
  const attendanceMap = useMemo(() => {
    const map = new Map<string, string>();
    attendenceRecord?.forEach((entry) => {
      if (entry.startTime) {
        const date = new Date(entry.startTime);
        // Format to YYYY-MM-DD to use as key
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        map.set(`${year}-${month}-${day}`, entry.status);
      }
    });
    return map;
  }, [attendenceRecord]); // Re-create map if attendenceRecord changes

  // Memoize calendar data to avoid recalculations on every render
  const { monthName, year, datesInMonth } = useMemo(() => {
    const today = new Date(currentDate); // Use a copy to avoid mutating state
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed month

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0); // Last day of current month

    const numDaysInMonth = lastDayOfMonth.getDate();
    const startDayIndex = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

    const dates: (number | null)[] = [];

    // Add nulls for leading empty days
    for (let i = 0; i < startDayIndex; i++) {
      dates.push(null);
    }

    // Add dates of the current month
    for (let i = 1; i <= numDaysInMonth; i++) {
      dates.push(i);
    }

    // Add nulls for trailing empty days to complete the last week if needed
    // This ensures a consistent grid structure (up to 6 rows x 7 days = 42 cells)
    const totalCells = dates.length;
    // Calculate remaining cells to fill the grid up to 42 cells (6 rows * 7 days)
    const remainingCells = (7 - (totalCells % 7)) % 7; // Cells to fill current last row
    for (let i = 0; i < remainingCells; i++) {
        dates.push(null);
    }
    // If fewer than 5 rows, add a full row of nulls to ensure 6 rows always for consistent height
    while (dates.length < 42) {
        dates.push(null);
    }


    // Format month and year for display
    const monthName = firstDayOfMonth.toLocaleString('en-US', { month: 'long' });

    return { monthName, year, datesInMonth: dates };
  }, [currentDate]); // Recalculate only when currentDate changes

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Helper to determine if a date is today (based on current system date)
  const isToday = (day: number | null) => {
    if (day === null) return false;
    const today = new Date(); // Get current system date
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getDayStatusClass = (date: number | null) => {
    if (date === null) return '';

    // Format the date to match the key in attendanceMap: YYYY-MM-DD
    const currentMonthFormatted = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDayFormatted = String(date).padStart(2, '0');
    const dateKey = `${year}-${currentMonthFormatted}-${currentDayFormatted}`;

    const status = attendanceMap.get(dateKey);

    switch (status) {
      case 'Present':
        // No special background, just default text. Or a subtle green if you want to highlight all present.
        return 'text-gray-800 bg-green-100 hover:bg-green-200 cursor-pointer'; // Example: subtle green for present
      case 'Leave':
      case 'Absent': // Assuming 'Absent' and 'Leave' get same styling for red
        return 'bg-red-500 text-white font-bold shadow-md';
      case 'Holiday':
        return 'bg-blue-400 text-white font-bold shadow-md'; // Example for holidays
             case 'Halfday':
        return 'bg-[#FEDD25] text-[#000000] font-bold shadow-md'; // Example for holidays
      // Add more cases for other statuses
      default:
        // Default style for days with no record or other status
        return 'text-gray-800 hover:bg-gray-100 cursor-pointer';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Performance</h3>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Previous Month"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <span className="text-base sm:text-lg font-medium text-gray-800">
          {monthName} {year}
        </span>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Next Month"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day: string) => (
          <div key={day} className="text-sm font-semibold text-gray-500">
            {day}
          </div>
        ))}
        {datesInMonth.map((date: number | null, index: number) => (
          <div
            key={index}
            className={`flex items-center justify-center p-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 mx-auto
              ${date ? getDayStatusClass(date) : 'text-gray-400'}
              ${isToday(date) ? 'border-2 border-blue-500' : ''}
              ${date && (new Date(year, currentDate.getMonth(), date).getDay() === 0 || new Date(year, currentDate.getMonth(), date).getDay() === 6) ? 'text-gray-500' : ''}
            `}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceCalendar;