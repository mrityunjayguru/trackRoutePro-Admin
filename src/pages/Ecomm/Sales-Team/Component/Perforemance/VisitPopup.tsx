// components/VisitPopup.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface VisitPopupProps {
  visit: any;
  onClose: () => void;
}

const VisitPopup: React.FC<VisitPopupProps> = ({ visit, onClose }) => {
    console.log(visit,"visitvisit")
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
          <FaTimes size={18} />
        </button>
        <h2 className="text-xl font-bold mb-4">Visit Feedback</h2>
      <h1 className='text-xl text-gray-500'>{visit.feedback}</h1>
        </div>
      </div>
  );
};

export default VisitPopup;
