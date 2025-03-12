import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function OtherDetail() {
  const datadashboard = useSelector((state: any) => state.dashboard.dashboard);
  const [activecount,setctivecount]=useState<number>(0)
  const [Inactivecount,setInctivecount]=useState<number>(0)
  useEffect(() => {
    datadashboard?.groupDevices?.groupedStatus.forEach((val: any) => {
      if (val._id === "Active") {
        setctivecount(val.count); 
        
      } else {
        setInctivecount(val.count); 
      }
    });
  }, [datadashboard]);
  return (
    <div className="bg-white shadow-lg rounded-lg p-2 w-full">
      <div className="grid grid-cols-5 gap-4 w-full  ">
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-lg font-semibold text-green-700">{activecount}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">Inactive</p>
          <p className="text-lg font-semibold text-red-700">{Inactivecount}</p>
        </div>
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-lg font-semibold text-blue-700">{datadashboard?.groupDevices?.totalCount }</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">Expiring in 15 days</p>
          <p className="text-lg font-semibold text-yellow-700">{datadashboard?.subscriberExp}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">Sleep</p>
          <p className="text-lg font-semibold text-yellow-700">0</p>
        </div>
      </div>
    </div>
  );
}
export default OtherDetail;
