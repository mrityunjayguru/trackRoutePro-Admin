import React, { useEffect } from "react";
import { FilePenLine } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import {
  getGpsDevices,
  setUpdateGpsDevices,
  updateGpsDevices,
} from "../../../../api/ecomm/gpsDevices";

const DeviceTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const deviceData = useSelector((state: any) => state?.gpsDevices?.gpsDevices);

  useEffect(() => {
    getStackedData();
  }, []);

  const getStackedData = async () => {
    try {
      const payload: any = {};
      await dispatch(getGpsDevices(payload));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (val: any) => {
    await dispatch(setUpdateGpsDevices(val));
    await getStackedData()
  };

  const handleToggleStatus = async (device: any) => {
    const updatedDevice:any = {
      _id:device?._id,
      isDeleted: !device.isDeleted,
    };
    console.log(updatedDevice,"updatedDeviceupdatedDevice")
    await dispatch(updateGpsDevices(updatedDevice));
    await getStackedData()

  };

  return (
    <div className="">
      <h1 className="text-lg font-[500] text-[#585859]">Device Catalogue</h1>
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-[#A6A6A6] text-sm">
            <th>Device Name</th>
            <th>Device Type</th>
            <th>Sub Text</th>
            <th>Price</th>
            <th>Govt Related</th>
            <th>category</th>
            <th>subcategory</th>
            <th>Edit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deviceData.map((device: any, idx: any) => (
            <tr
            
              key={idx}
              className="bg-white text-sm text-[#1A1D1F] font-[500] rounded shadow-sm"
            >
              <td className="py-2 px-4">{device.deviceName}</td>
              <td>{device.deviceType ? "Wired" : "Wireless"}</td>
              <td>{device.usp1}</td>
              <td>{device.price}</td>
              <td>{device.deviceType ? "Yes" : "No"}</td>
              <td>{device.category?.category}</td>
              <td>{device.subcategory?.subcategory}</td>

              <td>
                <FilePenLine  onClick={() => handleUpdate(device)} className="w-4 h-4 text-[#6C63FF] cursor-pointer" />
              </td>
              <td>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={device.isDeleted}
                    onChange={() => handleToggleStatus(device)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-checked:bg-[#000000] rounded-full peer relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#D9E821] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
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
