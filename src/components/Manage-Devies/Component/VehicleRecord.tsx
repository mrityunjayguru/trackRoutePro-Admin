import React from "react";
import { useSelector } from "react-redux";
import { formatDateToDDMMMYYYY, formatDateToDDMMMYYYYwithDate, formatDateToDDMMMYYYYwithTime } from "../../../common/ManageDate";

function VehicleRecord() {
  const devices = useSelector((state: any) => state.subscriber?.singleDevice);
    const maprecords = useSelector((state: any) => state?.map?.AllmapDetails || []);
  
console.log(maprecords,"devicesdevices")
  const vehicleData = {
    userName:devices?.ownerIDDetail.Name,
    imei:devices?.imei,
    vehicleNo:devices?.vehicleNo,

  };

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
    </div>
  );
}

export default VehicleRecord;
