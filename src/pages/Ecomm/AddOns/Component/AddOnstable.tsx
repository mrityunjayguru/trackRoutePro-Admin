import React, { useEffect } from "react";
import { Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { getaddOns, setUpdateaddOns, updateaddOns } from "../../../../api/ecomm/addOns";

const AddOnstable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addOns = useSelector((state: any) => state?.addOns?.addOns);

  const getRecord = async () => {
    try {
      const payload:any={}
      await dispatch(getaddOns(payload));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRecord();
  }, []);

  const handleUpdate =async (val: any) => {
    await dispatch(setUpdateaddOns(val));
  };

  const handleToggleStatus = async (device: any) => {
    const updated = {
      ...device,
      isDeleted: !device.isDeleted,
    };
    try {
      await dispatch(updateaddOns(updated));
      await getRecord(); // optional: re-fetch data to reflect changes
    } catch (err) {
      console.log("Status update failed", err);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-[#585859]">Add-ons Catalogue</h2>
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm text-[#A6A6A6]">
            <th>Device Name</th>
            <th>2nd Year</th>
            <th>3 Year Plan</th>
            <th>5 Year Plan</th>
            <th>Edit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {addOns?.map((device: any, idx: number) => (
            <tr key={idx} className="bg-white rounded shadow-sm text-[#1A1D1F]">
              <td className="py-2 px-4">{device?.device?.deviceName}</td>
              <td>
                <div>{device.secondYearCost}</div>
                <div className="text-xs text-gray-500">
                  {device.secondYearDiscount}% Discount
                </div>
              </td>
              <td>
                <div>{device.thirdYearCost}</div>
                <div className="text-xs text-gray-500">
                  {device.thirdYearDiscount}% Discount
                </div>
              </td>
              <td>
                <div>{device.fifthYearCost}</div>
                <div className="text-xs text-gray-500">
                  {device.fifthYearDiscount}% Discount
                </div>
              </td>
              <td>
                <Pencil
                  onClick={() => handleUpdate(device)}
                  className="w-4 h-4 text-purple-500 cursor-pointer"
                />
              </td>
              <td>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={device.isDeleted}
                    onChange={() => handleToggleStatus(device)}
                    className="sr-only peer"
                  />
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
