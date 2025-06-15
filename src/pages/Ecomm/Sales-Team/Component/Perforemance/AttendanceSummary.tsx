import React from 'react';

interface PerformanceData {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  Halfday:number;
  Availableday:number;
}

interface Props {
  performancedata: PerformanceData;
}

const AttendanceSummary: React.FC<Props> = ({ performancedata }) => {
  return (
    <div className="flex items-start bg-white p-4 space-x-8 rounded-xl shadow-sm">
      {/* Workdays Section */}
      <div className="flex flex-col items-start">
        <span className="text-gray-600 text-sm mb-1">Workdays</span>
        <span className="text-gray-900 text-2xl font-semibold">
          {performancedata?.totalDays}
        </span>
      </div>

      {/* Present Section */}
      <div className="flex flex-col items-start">
        <span className="text-gray-600 text-sm mb-1">Present</span>
        <span className="text-green-600 text-2xl font-semibold">
          {performancedata?.presentDays}
        </span>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-gray-600 text-sm mb-1">HalfDay</span>
        <span className="text-green-600 text-2xl font-semibold">
          {performancedata?.Halfday}
        </span>
      </div>
       {/* <div className="flex flex-col items-start">
        <span className="text-gray-600 text-sm mb-1">Work Day</span>
        <span className="text-green-600 text-2xl font-semibold">
          {performancedata?.Availableday}
        </span>
      </div> */}
      {/* Absent Section */}
      <div className="flex flex-col items-start">
        <span className="text-gray-600 text-sm mb-1">Absent</span>
        <span className="text-red-600 text-2xl font-semibold">
          {performancedata?.absentDays}
        </span>
      </div>
    </div>
  );
};

export default AttendanceSummary;
