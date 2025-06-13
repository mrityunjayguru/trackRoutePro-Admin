import React from 'react';

interface UserRecord {
  fullName?: string;
  employeecode?: string;
  email?: string;
  phone?: string;
  photo?:string;
}

interface UserProfileProps {
  record: UserRecord;
}

const UserProfile: React.FC<UserProfileProps> = ({ record }) => {
  return (
    <div className=" space-x-4 p-4 rounded-xl bg-[#F0F4FA] border border-gray-200">
      <div className="flex-shrink-0 flex gap-10 bg-[#ffffff] items-center">
        <img
          className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover shadow-md"
          src={`${import.meta.env?.VITE_APP_Image_Url}${record?.photo}`}
          alt={record?.fullName || "User"}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = "https://placehold.co/80x80/cccccc/000000?text=User";
          }}
        />
       <div>
         <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{record?.fullName || "Unnamed User"}</h2>
        <p className="text-sm sm:text-base text-gray-600">Sales Assistant</p>
       </div>
      </div>
      <div className="flex-grow">
        
        <div className="mt-3 text-gray-700 text-sm sm:text-base">
          <p className='text-[#1A1D1F] font-[500]'><span className="font-medium text-[#585859]">Employee Code:</span> {record?.employeecode || "N/A"}</p>
          <p className='text-[#1A1D1F] font-[500]'><span className="font-medium text-[#585859]">Primary Email ID:</span> {record?.email || "N/A"}</p>
          <p className='text-[#1A1D1F] font-[500]'><span className="font-medium text-[#585859]">Primary Mobile No:</span> {record?.phone || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
