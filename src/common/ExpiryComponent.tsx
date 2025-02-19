import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Define the type for the singleDevices prop
interface SingleDevice {
  subscriptionexp: string | null; // Adjust the type based on the actual structure of your data
}

interface ExpiryComponentProps {
  singleDevices: SingleDevice;
}

const ExpiryComponent: React.FC<ExpiryComponentProps> = ({ singleDevices }) => {
  const navigate = useNavigate();
  const data2 = useSelector((state: any) => state.subscriber.singleSubscriber);

  // Function to format the date
  const getDates = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString(); // You can customize this date format as per your needs
  };

  const reniewsubscribes = () => {
    localStorage.setItem('ownerid', data2._id);
    navigate('/manage/deviceList');
  };

  return (
    <div className="flex gap-24 mt-5 bg-[#F0F4FA]">
      <div className="px-5 py-2 rounded-2xl">
        <p className="text-red-500 font-bold text-[12px]">
          Subscription Expire
        </p>
        <h1 className="text-[#000] font-bold text-[14px]">
          {singleDevices?.subscriptionexp
            ? getDates(singleDevices.subscriptionexp)
            : '-'}
        </h1>
      </div>
      <button
        onClick={reniewsubscribes}
        className="w-[250px] bg-[#000000]  text-[#D9E821] py-1 my-3 rounded-lg font-medium transition ">
        Renew / Extend Subscription
      </button>
    </div>
  );
};

export default ExpiryComponent;
