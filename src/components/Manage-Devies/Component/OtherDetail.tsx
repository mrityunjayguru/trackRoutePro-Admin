import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeviceByOwnerId } from "../../../api/Device";
import { AppDispatch } from "../../../store/store";

function OtherDetail() {
  const dispatch = useDispatch<AppDispatch>();

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
  const handlefilter=async(val:any)=>{
    const payload:any={
      status:val,
    }
    if(val=="exp15"){
      Object.assign(payload,{exp15:"exp15"})
    }
    await  dispatch(DeviceByOwnerId(payload));

  }
  const getAllRecord=async()=>{
    const payload:any={}
    await  dispatch(DeviceByOwnerId(payload));

  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-2 w-full">
      <div className="grid grid-cols-5 gap-4 w-full " >
        <div className="p-4 bg-green-100 rounded-lg text-center cursor-pointer" onClick={()=>handlefilter('Active')}>
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-lg font-semibold text-green-700">{activecount}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg text-center cursor-pointer" onClick={()=>handlefilter('InActive')}>
          <p className="text-sm text-gray-600">Inactive</p>
          <p className="text-lg font-semibold text-red-700">{Inactivecount}</p>
        </div>
        <div className="p-4 bg-blue-100 rounded-lg text-center cursor-pointer" onClick={getAllRecord}>
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-lg font-semibold text-blue-700">{datadashboard?.groupDevices?.totalCount }</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg text-center cursor-pointer" onClick={()=>handlefilter('exp15')}>
          <p className="text-sm text-gray-600">Expiring in 15 days</p>
          <p className="text-lg font-semibold text-yellow-700">{datadashboard?.subscriberExp}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg text-center cursor-pointer">
          <p className="text-sm text-gray-600" onClick={()=>handlefilter('exp15')}>Sleep</p>
          <p className="text-lg font-semibold text-yellow-700">{datadashboard?.sleepmodecount?.length}</p>
        </div>
      </div>
    </div>
  );
}
export default OtherDetail;
