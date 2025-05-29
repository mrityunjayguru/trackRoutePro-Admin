import React, { useEffect } from "react";
import { Pencil } from "lucide-react";

// const deviceData = [
//   { name: "Sentinel", type: "Wired", subText: "4 Wired", price: "2,999", govt: "No", status: true },
//   { name: "MagTrack", type: "Wireless", subText: "-", price: "4,999", govt: "No", status: true },
//   { name: "GPS Max - GA", type: "Wired", subText: "8 Wired", price: "17,999", govt: "Yes", status: false },
// ];
import { UseSelector,useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { getGpsDevices, setUpdateGpsDevices } from "../../../../api/ecomm/gpsDevices";
const DeviceTable = () => {
const dispatch=useDispatch<AppDispatch>()
const deviceData=useSelector((state:any)=>state?.gpsDevices?.gpsDevices)
useEffect(()=>{
getStackedData()
},[])
const getStackedData=async()=>{
  try{
    const payload:any={}
await dispatch(getGpsDevices(payload))
  }catch(err){
    console.log(err)
  }
}
const handleUpdate=async(val:any)=>{
await dispatch(setUpdateGpsDevices(val))
}
  return (
    <div className="">
     
      <h1 className="text-lg font-[500] text-[#585859]">Device Catalogue</h1>
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left  text-[#A6A6A6] text-sm">
            <th>Device Name</th>
            <th>Device Type</th>
            <th>Sub Text</th>
            <th>Price</th>
            <th>Govt Related</th>
            <th>Edit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deviceData.map((device:any, idx:any) => (
            <tr  onClick={()=>handleUpdate(device)} key={idx} className="bg-white text-sm text-[#1A1D1F] font-[500] rounded shadow-sm">
              <td className="py-2 px-4">{device.deviceName}</td>
              <td>{device.deviceType?"wired":"wireless"}</td>
              <td>{device.usp1}</td>
              <td>{device.price}</td>
              <td>{device.deviceType?"Yes":"No"}</td>
              <td>
                <Pencil className="w-4 h-4 text-purple-500 cursor-pointer" />
              </td>
              <td>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={device.isDeleted} readOnly className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full peer relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;
