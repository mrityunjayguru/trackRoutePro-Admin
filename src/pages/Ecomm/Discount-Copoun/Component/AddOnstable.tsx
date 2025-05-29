import React from "react";
import { Pencil } from "lucide-react";

const deviceData = [
  { name: "Sentinel", type: "Wired", subText: "4 Wired", price: "2,999", govt: "No", status: true },
  { name: "MagTrack", type: "Wireless", subText: "-", price: "4,999", govt: "No", status: true },
  { name: "GPS Max - GA", type: "Wired", subText: "8 Wired", price: "17,999", govt: "Yes", status: false },
];

const AddOnstable = () => {
  return (
    <div className="">
     
      <h2 className="text-lg font-semibold mb-4 text-[#585859]">Discount Coupon List</h2>
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm text-[#A6A6A6]">
            <th>Code</th>
            <th>Discount</th>
            <th>Sub Text</th>
            <th>Start</th>
            <th>End</th>
            <th>Edit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deviceData.map((device, idx) => (
            <tr key={idx} className="bg-white rounded shadow-sm text-[#1A1D1F]">
              <td className="py-2 px-4">{device.name}</td>
              <td>{device.type}</td>
              <td>{device.subText}</td>
              <td>{device.price}</td>
              <td>{device.govt}</td>
              <td>
                <Pencil className="w-4 h-4 text-purple-500 cursor-pointer" />
              </td>
              <td>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={device.status} readOnly className="sr-only peer" />
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

export default AddOnstable;
