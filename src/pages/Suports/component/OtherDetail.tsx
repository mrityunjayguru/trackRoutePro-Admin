import React, { useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";

const OtherDetail = ({
  isOpen,
  onClose,
  Suportdetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  Suportdetails: any;
}) => {
  const [reason, setReason] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleSubmit = () => {
    if (reason.trim()) {
   
      setReason('');
    }
  };
console.log(Suportdetails,"SuportdetailsSuportdetailsSuportdetails")
  return isOpen ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className='flex gap-1 items-center justify-between my-2'>
          <div className='flex items-center gap-1'>
            <div className='w-3 h-3 rounded-full bg-[#E23226]'></div>
            <h2 className="text-normal text-[#000000] font-semibold">
              {Suportdetails.emailAddress              }
            </h2>
          </div>
          <div className='cursor-pointer' onClick={onClose}>
            <RxCrossCircled size={25} />
          </div>
        </div>

        <p>{Suportdetails.description }</p>

      
      </div>
    </div>
  ) : null;
};

export default OtherDetail;




