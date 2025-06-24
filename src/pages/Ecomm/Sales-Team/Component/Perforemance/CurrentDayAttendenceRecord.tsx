import React from 'react';
import { formatDateToDDMMMYYYYwithTime, formatDateToYMDHM } from '../../../../../common/ManageDate';
import { format } from 'date-fns';
interface UserRecord {
  fullName:string,
  endTime?: string;
  startTime?: string;
  status?: string;
  photo?: string;
}

interface CurrentDayAttendenceRecordProps {
  record: UserRecord;
}

const CurrentDayAttendenceRecord: React.FC<CurrentDayAttendenceRecordProps> = ({ record }) => {
  // Access environment variable using process.env for broader compatibility
  // In some build environments, import.meta is not available or causes warnings.
  const imageUrlBase = import.meta.env.VITE_APP_Image_Url || ''; 
  const today = new Date();
  const day = today.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  const currentFormattedDate = `${day} ${month} ${year}`;

  return (
    <div className="flex items-center space-x-4 p-4 rounded-xl bg-[#F0F4FA] border border-gray-200 shadow-md max-w-lg mx-auto my-4">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg shadow-md object-cover" // Adjusted size and added object-cover
          src={`${imageUrlBase}${record?.photo}`} // Updated to use imageUrlBase
          alt={record?.fullName || "User"}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = "https://placehold.co/96x96/cccccc/000000?text=User"; // Updated placeholder size
          }}
        />
      </div>

      {/* Text Content Section */}
      <div className="flex-grow flex flex-col justify-center">
        {/* Date */}
        <p className="text-gray-700 text-sm sm:text-base font-semibold mb-1">
          {currentFormattedDate || "N/A"}
        </p>

        {/* Clock In Time */}
        <p className="text-gray-700 text-sm sm:text-base mb-1">
      <span className="font-medium text-[#585859]">
  Clock-in Time:
</span>{" "}
{formatDateToYMDHM(record?.startTime)}
        </p>

      </div>
    </div>
  );
};

export default CurrentDayAttendenceRecord;
