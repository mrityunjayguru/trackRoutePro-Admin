import React from "react";
import { formatDateToDDMMMYYYYwithTime } from "./ManageDate";

interface LogPopupProps {
  isOpen: boolean;
  togglePopup: () => void;
  records:any
}

const LogPopup: React.FC<LogPopupProps> = ({ isOpen, togglePopup,records }) => {

  return (
    <div>
      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg shadow-lg w-[30rem]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[#D9E821]">
              <h4 className="text-lg font-semibold text-gray-800">Recent Updates</h4>
              <button onClick={togglePopup} className="text-gray-600 hover:text-gray-800 text-2xl font-bold">
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-80 overflow-y-auto flex justify-center items-center flex-col ">
              {records?.map((update:any, index:any) => (
               <div className="py-1">
                 <p key={index} className="text-sm text-[#9F9EA2] mb-2">
                  Updated By:{" "}
                  <span className="font-medium  text-[#000]">{update.Name}</span>{" "}
                  (<span className="text-[#9F9EA2]">{update.uniqueCode}</span>) on <span className="text-[#000]">{formatDateToDDMMMYYYYwithTime(update.time)}</span>
                  {/* <span className="font-medium">{update.date}</span>, {update.time} */}
                </p>
               </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogPopup;
