import React from 'react';

interface UserRecord {
  fullName?: string;
  employeecode?: string;
  email?: string;
  phone?: string;
  photo?:string;
}

interface CurrentDayAttendenceRecordProps {
  record: UserRecord;
}

const CurrentDayAttendenceRecord: React.FC<CurrentDayAttendenceRecordProps> = ({ record }) => {
  return (
    <div className="h-40 space-x-4  rounded-xl bg-[#F0F4FA] border border-gray-200">
      <div className="w-full h-full flex gap-5  items-center">
        <img
          className=" w-16 sm:sm:w-20   shadow-md"
          src={`${import.meta.env?.VITE_APP_Image_Url}${record?.photo}`}
          alt={record?.fullName || "User"}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = "https://placehold.co/80x80/cccccc/000000?text=User";
          }}
        />
         <div className="flex-grow">
        
        <div className="mt-3 text-gray-700 text-sm sm:text-base">
          <p className='text-[#1A1D1F] font-[500]'><span className="font-medium text-[#585859]">Clock In Time:</span> {record?.employeecode || "N/A"}</p>
          <p className='text-[#1A1D1F] font-[500]'><span className="font-medium text-[#585859]">Address:</span> {record?.email || "N/A"}</p>
          <p className='text-[#1A1D1F] font-[500]'><span className="font-medium text-[#585859]">Location:</span> {record?.phone || "N/A"}</p>
        </div>
      </div>
      </div>
   
    </div>
  );
};

export default CurrentDayAttendenceRecord;
