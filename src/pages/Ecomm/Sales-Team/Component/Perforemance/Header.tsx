import React, { useState } from 'react';
import DatePickerRange from './DatePickerRange';

const Header = () => {
  const [selectedMonth, setSelectedMonth] = useState('May 2025'); // Initial state for the dropdown

  const handleMonthChange = (event:any) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      {/* Performance Chart Title */}
        <div className="flex gap-5 items-center space-x-2">
        {/* Life Time Button */}
      
        <button className="px-4 py-2 text-sm font-medium rounded-md bg-lime-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50">
          Life Time
        </button>
        {/* Month Dropdown */}
          <div className="relative">
          <DatePickerRange/>
        </div>
        
      </div>
      <h2 className="text-xl font-semibold text-gray-700">
        Performance Chart
      </h2>

      {/* Right-hand side buttons and dropdown */}
    
    </div>
  );
};

export default Header;