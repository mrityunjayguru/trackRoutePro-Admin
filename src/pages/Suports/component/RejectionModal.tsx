import React, { useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";

const RejectionModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => any;
}) => {
  const [reason, setReason] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason);
      setReason('');
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className='flex gap-1 items-center justify-between my-2'>
          <div className='flex items-center gap-1'>
            <div className='w-3 h-3 rounded-full bg-[#E23226]'></div>
            <h2 className="text-normal text-[#000000] font-semibold">
              Provide a Reason for Ticket Rejection
            </h2>
          </div>
          <div className='cursor-pointer' onClick={onClose}>
            <RxCrossCircled size={25} />
          </div>
        </div>

        <textarea
          value={reason}
          onChange={handleInputChange}
          className="w-full min-h-[100px] pl-5 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#D9E821] focus:outline-none"
          placeholder="Enter reason for rejection"
        />

        <div className="flex justify-end my-2 gap-4">
          <button
            className="bg-[#000000] text-[#D9E821] px-7 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default RejectionModal;
