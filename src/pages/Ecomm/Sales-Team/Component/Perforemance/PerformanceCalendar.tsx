import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Using Lucide React for arrows

// Interface for a single attendance entry
interface AttendanceEntry {
  _id: string;
  userId: string;
  startTime: string; // ISO 8601 string, e.g., "2025-06-06T09:00:00.000Z"
  endTime: string | null;
  status: 'Present' | 'Leave' | 'Absent' | 'Holiday' | 'Halfday' | string; // Extend as needed
  reason: string;
  __v: number;
}

// Props for the PerformanceCalendar component
interface PerformanceCalendarProps {
  attendenceRecord: AttendanceEntry[];
}

const PerformanceCalendar: React.FC<PerformanceCalendarProps> = ({ attendenceRecord }) => {
  // State for the currently displayed month/year in the calendar
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  // State to store information about the hovered day for the tooltip
  const [hoveredDayInfo, setHoveredDayInfo] = useState<{
    date: number | null;
    status: string | null;
    reason: string | null;
    x: number; // X-coordinate for tooltip positioning
    y: number; // Y-coordinate for tooltip positioning
  } | null>(null);

  // Days of the week for calendar header
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Memoize attendance record into a map for efficient lookup: 'YYYY-MM-DD' -> AttendanceEntry
  const attendanceMap = useMemo(() => {
    const map = new Map<string, AttendanceEntry>();
    attendenceRecord?.forEach((entry) => {
      if (entry.startTime) {
        const date = new Date(entry.startTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        map.set(`${year}-${month}-${day}`, entry); // Store the entire entry for status and reason
      }
    });
    return map;
  }, [attendenceRecord]); // Re-create map if attendenceRecord changes

  // Memoize calendar data (month name, year, and dates array) to avoid recalculations
  const { monthName, year, datesInMonth } = useMemo(() => {
    const today = new Date(currentDate); // Use a copy to avoid mutating state
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed month

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0); // Last day of current month

    const numDaysInMonth = lastDayOfMonth.getDate();
    const startDayIndex = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

    const dates: (number | null)[] = [];

    // Add nulls for leading empty days (days before the 1st of the month)
    for (let i = 0; i < startDayIndex; i++) {
      dates.push(null);
    }

    // Add dates of the current month
    for (let i = 1; i <= numDaysInMonth; i++) {
      dates.push(i);
    }

    // Add nulls for trailing empty days to complete the last week and ensure 6 rows
    // This ensures a consistent grid structure (up to 6 rows x 7 days = 42 cells)
    const totalCells = dates.length;
    const remainingCellsInLastRow = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < remainingCellsInLastRow; i++) {
      dates.push(null);
    }
    // Ensure there are always 6 rows (42 cells) for consistent height
    while (dates.length < 42) {
      dates.push(null);
    }

    // Format month and year for display
    const monthName = firstDayOfMonth.toLocaleString('en-US', { month: 'long' });

    return { monthName, year, datesInMonth: dates };
  }, [currentDate]); // Recalculate only when currentDate changes

  // Function to navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Function to navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Helper to determine if a given date is today (based on current system date)
  const isToday = (day: number | null) => {
    if (day === null) return false;
    const today = new Date(); // Get current system date
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Determines the CSS class for a date cell based on its attendance status
  const getDayStatusClass = (date: number | null) => {
    if (date === null) return '';

    // Format the date to match the key in attendanceMap: YYYY-MM-DD
    const currentMonthFormatted = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDayFormatted = String(date).padStart(2, '0');
    const dateKey = `${year}-${currentMonthFormatted}-${currentDayFormatted}`;

    const entry = attendanceMap.get(dateKey); // Get the full entry

    switch (entry?.status) {
      case 'Present':
        return 'text-gray-800 bg-green-100 hover:bg-green-200 cursor-pointer';
      case 'Leave':
      case 'Absent':
        return 'bg-red-500 text-white font-bold shadow-md';
      case 'Holiday':
        return 'bg-blue-400 text-white font-bold shadow-md';
      case 'Halfday':
        return 'bg-[#FEDD25] text-[#000000] font-bold shadow-md';
      default:
        // Default style for days with no record or other status
        return 'text-gray-800 hover:bg-gray-100 cursor-pointer';
    }
  };

  // Handles mouse entering a date cell to show the tooltip
  const handleMouseEnter = (day: number | null, e: React.MouseEvent<HTMLDivElement>) => {
    if (day === null) {
      setHoveredDayInfo(null); // Clear info if hovering over a null day
      return;
    }

    const currentMonthFormatted = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDayFormatted = String(day).padStart(2, '0');
    const dateKey = `${year}-${currentMonthFormatted}-${currentDayFormatted}`;

    const entry = attendanceMap.get(dateKey); // Get the full entry

    // Get the position of the hovered element and the calendar container
    const rect = e.currentTarget.getBoundingClientRect();
    const calendarContainer = e.currentTarget.closest('.performance-calendar-container');
    const calendarRect = calendarContainer?.getBoundingClientRect();

    if (calendarRect) {
      setHoveredDayInfo({
        date: day,
        status: entry?.status || 'No Record', // Default to 'No Record' if no entry
        reason: entry?.reason || null,
        // Position tooltip relative to the calendar container
        x: rect.left - calendarRect.left + (rect.width / 2), // Center horizontally
        y: rect.bottom - calendarRect.top + 5, // 5px below the cell
      });
    }
  };

  // Handles mouse leaving a date cell to hide the tooltip
  const handleMouseLeave = () => {
    setHoveredDayInfo(null);
  };

  return (
    // Main container for the calendar, with relative positioning for tooltip
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 relative performance-calendar-container">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Performance</h3>
      {/* Calendar header with month navigation */}
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
      {/* Days of the week header */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day: string) => (
          <div key={day} className="text-sm font-semibold text-gray-500">
            {day}
          </div>
        ))}
        {/* Calendar grid of dates */}
        {datesInMonth.map((date: number | null, index: number) => (
          <div
            key={index}
            className={`flex items-center justify-center p-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 mx-auto transition-colors duration-100 ease-in-out
              ${date ? getDayStatusClass(date) : 'text-gray-400'}
              ${isToday(date) ? 'border-2 border-blue-500' : ''}
              ${date && (new Date(year, currentDate.getMonth(), date).getDay() === 0 || new Date(year, currentDate.getMonth(), date).getDay() === 6) ? 'text-gray-500' : ''}
            `}
            onMouseEnter={(e) => handleMouseEnter(date, e)}
            onMouseLeave={handleMouseLeave}
          >
            {date}
          </div>
        ))}
      </div>

      {/* Tooltip for hovered dates */}
      {hoveredDayInfo && (
        <div
          className="absolute bg-gray-800 text-white text-sm p-2 rounded-md shadow-lg z-50 transform -translate-x-1/2"
          style={{ left: hoveredDayInfo.x, top: hoveredDayInfo.y }}
        >
          <p><span className="font-semibold">Status:</span> {hoveredDayInfo.status}</p>
          {hoveredDayInfo.reason && hoveredDayInfo.reason !== "" && <p><span className="font-semibold">Reason:</span> {hoveredDayInfo.reason}</p>}
        </div>
      )}
    </div>
  );
};

export default PerformanceCalendar;
