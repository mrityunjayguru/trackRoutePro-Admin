import React, { useState } from 'react';
import DatePickerRange from './DatePickerRange';
import { performanceData } from '../../../../../api/ecomm/salesTeam';
import { AsyncThunkAction, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
interface PerformanceState {
  _id: string;
  // Add other properties of your performance state if needed
}
const Header = () => {
  const [selectedMonth, setSelectedMonth] = useState('May 2025'); // Initial state for the dropdown
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, UnknownAction>>();
  const performance = useSelector((state: { slesTeame: { performance: PerformanceState } }) => state?.slesTeame?.performance);
const [blank,setblank] = useState<any>(null);
  const handleMonthChange = async () => {
    setblank(new Date())
    const payload: any = {
      userId: performance?._id,
    };

    await dispatch(performanceData(payload));
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      {/* Performance Chart Title */}
      <div className="flex gap-5 items-center space-x-2">
        {/* Life Time Button */}

        {/* Month Dropdown */}
        <div className="relative">
          <DatePickerRange setblank={blank} />
        </div>
      </div>
      <button onClick={handleMonthChange} className="px-4 py-2 text-sm font-medium rounded-md bg-lime-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50">
        Life Time
      </button>
      {/* <h2 className="text-xl font-semibold text-gray-700">
        Performance Chart
      </h2> */}

      {/* Right-hand side buttons and dropdown */}

    </div>
  );
};

export default Header;


