import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToDDMMMYYYY, formatDateToDDMMMYYYYwithDate, formatDateToDDMMMYYYYwithTime } from "../../../common/ManageDate";
import { FaEye } from "react-icons/fa";
import { GetDealearRecord, setUserImei } from "../../../api/Device";
import { AppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";

function VehicleRecord() {
  const devices = useSelector((state: any) => state.subscriber?.singleDevice);
  const userImei = useSelector((state: any) => state.subscriber?.userImei);
  const navigate=useNavigate()
    const maprecords = useSelector((state: any) => state?.map?.AllmapDetails || []);
  const dispatch=useDispatch<AppDispatch>()
  const vehicleData = {
    userName:devices?.ownerIDDetail.Name,
    imei:devices?.imei,
    vehicleNo:devices?.vehicleNo,

  };
const handleClick=async(val:any)=>{
  const payload:any={
    imei:val
  }
         await dispatch(setUserImei(payload));
         navigate("/account-management/manage-subscriber")
}
  return (
    <div className="flex gap-4 my-2 p-4 border rounded-lg ">
      <p>
        <strong>User Name:</strong> <span>{vehicleData.userName}</span>
      </p>
      <p>
        <strong>IMEI:</strong> <span>{vehicleData.imei}</span>
      </p>
      <p>
        <strong>vehicleNo:</strong> <span>{vehicleData.vehicleNo}</span>
      </p>
      <p>
        <strong>latest Update:</strong> <span>{formatDateToDDMMMYYYYwithTime(maprecords[0].createdAt)}</span>
      </p>
      <p onClick={()=>handleClick(vehicleData.imei)} className="text-center  cursor-pointer flex justify-center items-center text-[#D9E821]">    <FaEye style={{ fontSize: '24px' }} /></p>
    </div>
  );
}

export default VehicleRecord;
