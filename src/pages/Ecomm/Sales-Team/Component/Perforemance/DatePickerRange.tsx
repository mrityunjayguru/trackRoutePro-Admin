import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { performanceData } from '../../../../../api/ecomm/salesTeam';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';

// Define the type for the performance data from Redux (adjust based on your actual data structure)
interface PerformanceState {
  _id: string;
  // Add other properties of your performance state if needed
}

// Main App component
interface DatePickerRangeProps {
  setblank: any; // Replace 'any' with a more specific type if possible
}

export default function DatePickerRange({ setblank }: DatePickerRangeProps) {
  const dispatch = useDispatch<AppDispatch>();
  const performance = useSelector((state: { slesTeame: { performance: PerformanceState } }) => state?.slesTeame?.performance);

  const [isPickerOpen, setIsPickerOpen] = useState(false); // State to control calendar visibility
  const [startDate, setStartDate] = useState<Date | null>(null); // State for the selected start date
  const [endDate, setEndDate] = useState<Date | null>(null); // State for the selected end date
  const [hoverDate, setHoverDate] = useState<Date | null>(null); // State for date hovering during range selection
  const pickerRef = useRef<HTMLDivElement>(null); // Ref for the picker container to handle outside clicks
useEffect(()=>{
setStartDate(null)
setEndDate(null)
},[setblank])
  // Initialize current months for the two calendars
  const [currentMonthLeft, setCurrentMonthLeft] = useState(new Date());
  const [currentMonthRight, setCurrentMonthRight] = useState(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });

  // Effect to handle clicks outside the date picker to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getPerformanceData = async () => {
    // Only dispatch if at least a startDate is set
    if (!startDate) return;

    const getDates=(mydate:any)=>{
      const date = new Date(mydate);
const yyyy = date.getFullYear();                             // 2025
const mm = String(date.getMonth() + 1).padStart(2, '0');     // "06"
const dd = String(date.getDate()).padStart(2, '0');          // "21"

const formattedDate = `${yyyy}-${mm}-${dd}`;
return formattedDate
    }
    // Correctly format Date objects to ISO strings before splitting
    const formattedStartDate =await  getDates(startDate);
    const formattedEndDate =await  getDates(endDate);
    const payload: any = {
      userId: performance?._id,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    await dispatch(performanceData(payload));
  };

  useEffect(() => {
    getPerformanceData();
  }, [startDate, endDate, performance?._id]); // Dependencies for fetching data

  // Function to format a date into MM/DD/YYYY string
  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Generates an array of dates for a given month and year
  const getDaysInMonth = useCallback((year: number, month: number): (Date | null)[] => {
    const date = new Date(year, month, 1);
    const days: (Date | null)[] = [];
    // Add leading blank days
    const firstDayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    // Add trailing blank days to fill the last week
    while (days.length % 7 !== 0) {
      days.push(null);
    }
    return days;
  }, []);

  // Handles the click event on a date cell
  const handleDateClick = (day: Date | null) => {
    if (!day) return; // Ignore clicks on blank cells

    // Normalize the clicked day to start of day to avoid time component issues
    const normalizedDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());

    if (!startDate || (startDate && endDate)) {
      // If no start date or both start and end dates are set, start a new selection
      setStartDate(normalizedDay);
      setEndDate(null); // Reset end date for a new selection
    } else if (startDate && !endDate) {
      // If only start date is set, and a new date is clicked
      if (normalizedDay.getTime() === startDate.getTime()) {
        // If the same date is clicked again, treat it as a single selection
        setEndDate(normalizedDay); // Set end date to be the same as start date
        setIsPickerOpen(false); // Close picker after single selection
      } else if (normalizedDay < startDate) {
        // If the clicked date is before the current startDate, make it the new startDate
        setEndDate(startDate); // The old start date becomes the new end date
        setStartDate(normalizedDay); // The new click becomes the new start date
        setIsPickerOpen(false); // Close picker after range selection
      } else {
        // If the clicked date is after or equal to startDate, set it as the end date
        setEndDate(normalizedDay);
        setIsPickerOpen(false); // Close picker after range selection
      }
    }
  };

  // Handles mouse enter event on a date cell for hover effect during range selection
  const handleDateHover = (day: Date | null) => {
    if (startDate && !endDate) {
      setHoverDate(day);
    }
  };

  // Handles mouse leave event from the calendar grid
  const handleMouseLeave = () => {
    setHoverDate(null);
  };

  // Checks if a date falls within the selected range (or hovered range)
  const isInRange = (day: Date | null): boolean => {
    if (!day) return false;
    let start = startDate;
    let end = endDate || hoverDate;

    // Ensure start is always before or equal to end for range check
    if (start && end && start > end) {
      [start, end] = [end, start]; // Swap them if start is greater than end
    }

    return (!!start && !!end && day >= start && day <= end) ||
           (!!start && !end && day.toDateString() === start.toDateString()); // For single selection
  };

  // Checks if a date is the start date
  const isStartDate = (day: Date | null): boolean => {
    return !!(day && startDate && day.toDateString() === startDate.toDateString());
  };

  // Checks if a date is the end date
  const isEndDate = (day: Date | null): boolean => {
    return !!(day && endDate && day.toDateString() === endDate.toDateString());
  };

  // Navigates to the previous month for the specified calendar
  const goToPreviousMonth = (calendar: 'left' | 'right') => {
    if (calendar === 'left') {
      setCurrentMonthLeft((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(newDate.getMonth() - 1);
        // Ensure right calendar stays at least one month ahead
        if (newDate.getFullYear() > currentMonthRight.getFullYear() ||
            (newDate.getFullYear() === currentMonthRight.getFullYear() && newDate.getMonth() >= currentMonthRight.getMonth())) {
          setCurrentMonthRight(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1));
        }
        return newDate;
      });
    } else {
      setCurrentMonthRight((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(newDate.getMonth() - 1);
        // Ensure left calendar stays at least one month behind
        if (newDate.getFullYear() < currentMonthLeft.getFullYear() ||
            (newDate.getFullYear() === currentMonthLeft.getFullYear() && newDate.getMonth() <= currentMonthLeft.getMonth())) {
          setCurrentMonthLeft(new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1));
        }
        return newDate;
      });
    }
  };

  // Navigates to the next month for the specified calendar
  const goToNextMonth = (calendar: 'left' | 'right') => {
    if (calendar === 'left') {
      setCurrentMonthLeft((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(newDate.getMonth() + 1);
        // Ensure left calendar doesn't overtake right calendar
        if (newDate.getFullYear() > currentMonthRight.getFullYear() ||
            (newDate.getFullYear() === currentMonthRight.getFullYear() && newDate.getMonth() >= currentMonthRight.getMonth())) {
          setCurrentMonthRight(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1));
        }
        return newDate;
      });
    } else {
      setCurrentMonthRight((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(newDate.getMonth() + 1);
        // Ensure right calendar stays at least one month ahead
        if (newDate.getFullYear() < currentMonthLeft.getFullYear() ||
            (newDate.getFullYear() === currentMonthLeft.getFullYear() && newDate.getMonth() <= currentMonthLeft.getMonth())) {
          setCurrentMonthLeft(new Date(newDate.getFullYear(), newDate.getMonth() - 1, 1));
        }
        return newDate;
      });
    }
  };

  // Renders a single calendar view for a given month
  const renderCalendar = (monthDate: Date, calendarType: 'left' | 'right') => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const days = getDaysInMonth(year, month);
    const monthName = monthDate.toLocaleString('default', { month: 'long' });

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date

    return (
      <div className="flex flex-col items-center p-4">
        <div className="flex justify-between items-center w-full mb-4">
          <button
            onClick={() => goToPreviousMonth(calendarType)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            aria-label="Previous month"
            // Disable previous button for right calendar if it's the month after the left calendar
            disabled={calendarType === 'right' &&
              (monthDate.getFullYear() === currentMonthLeft.getFullYear() && monthDate.getMonth() === currentMonthLeft.getMonth() + 1)}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-semibold text-lg text-gray-800">
            {monthName} {year}
          </span>
          <button
            onClick={() => goToNextMonth(calendarType)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            aria-label="Next month"
            // Disable next button for left calendar if it's the month before the right calendar
            disabled={calendarType === 'left' &&
              (monthDate.getFullYear() === currentMonthRight.getFullYear() && monthDate.getMonth() === currentMonthRight.getMonth() - 1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm w-full text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const isToday = day && day.toDateString() === today.toDateString();
            const selected = isStartDate(day) || isEndDate(day);
            const inRange = isInRange(day);

            let dayClasses = `p-2 rounded-full cursor-pointer transition-all duration-200 ease-in-out transform`;

            if (day) {
              if (isStartDate(day) && isEndDate(day)) { // Single day selected or start/end same
                dayClasses += ` bg-blue-600 text-white shadow-md scale-105`;
              } else if (isStartDate(day)) {
                dayClasses += ` bg-blue-600 text-white rounded-l-full shadow-md scale-105`;
              } else if (isEndDate(day)) {
                dayClasses += ` bg-blue-600 text-white rounded-r-full shadow-md scale-105`;
              } else if (inRange) {
                dayClasses += ` bg-blue-200 text-blue-800`;
              } else {
                dayClasses += ` hover:bg-gray-100`;
              }

              if (isToday && !selected) {
                dayClasses += ` border-2 border-blue-500 text-blue-700`; // Highlight today if not selected
              }
            } else {
              dayClasses += ` opacity-0 cursor-default`; // Blank cells
            }

            return (
              <div
                key={index}
                className={dayClasses}
                onClick={() => handleDateClick(day)}
                onMouseEnter={() => handleDateHover(day)}
              >
                {day ? day.getDate() : ''}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Determine the displayed date range text
  const displayDateRange = (): string => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    } else if (startDate) {
      // If only startDate is set (e.g., waiting for endDate or single selection)
      return formatDate(startDate);
    }
    return '';
  };

  return (
    <div className="">
      <div className="relative" ref={pickerRef}>
        {/* Input field */}
        <div
          className="relative flex items-center w-80 max-w-full bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-200 overflow-hidden"
          onClick={() => setIsPickerOpen(!isPickerOpen)}
        >
          <input
            type="text"
            readOnly
            value={displayDateRange()}
            className="flex-grow p-3 text-gray-800 outline-none cursor-pointer placeholder-gray-400"
            placeholder="Select date or range"
            aria-haspopup="true"
            aria-expanded={isPickerOpen}
          />
          <button
            className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 focus:outline-none"
            aria-label="Open date picker"
          >
            <CalendarIcon size={20} />
          </button>
        </div>

        {/* Calendar picker dropdown */}
        {isPickerOpen && (
          <div
            className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-[600px] "
            onMouseLeave={handleMouseLeave} // Handle mouse leave from the entire picker
          >
            {renderCalendar(currentMonthLeft, 'left')}
            <div className="hidden md:block w-px bg-gray-200 my-4 mx-2"></div> {/* Separator */}
            {renderCalendar(currentMonthRight, 'right')}
          </div>
        )}
      </div>
    </div>
  );
}