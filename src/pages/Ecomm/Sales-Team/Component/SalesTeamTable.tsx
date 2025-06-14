import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import {
  getSalesTeam,
  handlePerformence,
  setupdatesalesTeam,
  updatesalesTeam
} from '../../../../api/ecomm/salesTeam';
import { TbEdit } from 'react-icons/tb';
import { ViewIcons } from '../../../../components/Sidebar/SideBarSvgIcons';

const AddOnstable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const salesTeam = useSelector((state: any) => state?.slesTeame?.slesTeame);

  const getRecord = async () => {
    try {
      const payload:any={}
      await dispatch(getSalesTeam(payload));
    } catch (err) {
      console.error('Failed to fetch sales team', err);
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
      isDeleted: !device.isDeleted
    };
    try {
      await dispatch(updatesalesTeam(updated));
      await getRecord();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handlePerformences = async (val: any) => {
    await dispatch(handlePerformence(val));
  };

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4 text-[#585859]">Add-ons Catalogue</h2>

      <table className="min-w-[800px] w-full table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm text-[#A6A6A6]">
            <th>Name</th>
            <th>Employee Code</th>
            <th>Designation</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Discount</th>
            <th>Edit</th>
            <th>Performance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {salesTeam?.map((device: any, idx: number) => (
            <tr key={idx} className="bg-white rounded shadow-sm text-sm md:text-base text-[#1A1D1F]">
              <td className="whitespace-nowrap">{device.fullName}</td>
              <td className="whitespace-nowrap">{device.employeecode}</td>
              <td className="whitespace-nowrap">{device.designationData?.designation}</td>
              <td className="whitespace-nowrap">{device.operatingArea}</td>
              <td className="whitespace-nowrap">{device.phone}</td>
              <td className="whitespace-nowrap">{device.email}</td>
              <td className="whitespace-nowrap">{device.couponData?.discountCode}</td>
              <td>
                <TbEdit
                  size={20}
                  onClick={() => handleUpdate(device)}
                  className="text-[#6C63FF] cursor-pointer"
                />
              </td>
              <td onClick={() => handlePerformences(device)} className="cursor-pointer">
                <ViewIcons />
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
