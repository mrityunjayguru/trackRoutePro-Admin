import React, { useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { getSalesTeam, handlePerformence, setupdatesalesTeam, updatesalesTeam } from '../../../../api/ecomm/salesTeam';
import { TbEdit } from "react-icons/tb";
import { ViewIcons } from '../../../../components/Sidebar/SideBarSvgIcons';
const AddOnstable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const salesTeam = useSelector((state: any) => state?.slesTeame?.slesTeame);

  const getRecord = async () => {
    try {
      const payload:any={}
      await dispatch(getSalesTeam(payload));
    } catch (err) {
      console.error("Failed to fetch sales team", err);
    }
  };

  useEffect(() => {
    getRecord();
  }, []);

  const handleUpdate = async (val: any) => {
    await dispatch(setupdatesalesTeam(val));
  };

  const handleToggleStatus = async (device: any) => {
    const updated = {
      ...device,
      isDeleted: !device.isDeleted,
    };

    try {
      await dispatch(updatesalesTeam(updated));
      await getRecord(); // Optionally re-fetch data, or optimistically update state
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };
const handlePerformences=async(val:any)=>{
    await dispatch(handlePerformence(val));

  console.log(val,"valvalval")
}
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-[#585859]">Add-ons Catalogue</h2>
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm text-[#A6A6A6]">
            <th>Name</th>
            <th>email</th>
            <th>phone</th>
            <th>Designation</th>
            <th>Employee Code</th>
            <th>Discount</th>
            <th>Location</th>
            <th>image</th>
            <th>Edit</th>
            <th>Perforamence</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {salesTeam?.map((device: any, idx: number) => (
            <tr key={idx} className="bg-white font-[500]  rounded shadow-sm text-[#1A1D1F]">
              <td className="">{device.fullName}</td>
              <td className="">{device.email}</td>
              <td className="">{device.phone}</td>
              <td>{device.designationData?.designation}</td>
              <td>{device.employeecode}</td>
              <td>{device.couponData?.discountCode}</td>
              <td>{device.operatingArea}</td>
              <td> <img className='w-20 h-20 object-cover' src={ `${import.meta.env.VITE_APP_Image_Url}${device.photo}`} alt="" /></td>

              <td>
                <TbEdit size={24}
                  onClick={() => handleUpdate(device)}
                  className="  text-[#6C63FF] cursor-pointer"
                />
              </td>
                  <td  onClick={() => handlePerformences(device)} className='cursor-pointer'>
                < ViewIcons 
                
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
