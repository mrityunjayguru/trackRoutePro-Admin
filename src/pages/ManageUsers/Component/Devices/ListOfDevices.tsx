import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { DeviceByOwnerId, manageSingleDevices } from '../../../../api/Device';
import { AppDispatch } from '../../../../store/store';
import Select from 'react-select';
import { Getsubscribers } from '../../../../api/users';
import CommonHeader from '../../../../common/CommonHeader';
import { downloadDevices, dowonloadUser } from '../../../../api/DownloadDetail';

interface Device {
  _id: string;
  deviceId: string;
  imei: string;
  vehicleTypeDetails?: {
    vehicleTypeName: string;
  };
  status: 'Active' | 'InActive';
  vehicleNo: string;
  dateAdded: string;
}

const ListOfDevices: React.FC = () => {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [deviceRecords, setDeviceRecords] = useState<Device[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: any) => state.subscriber.singleSubscriber); 

  // Fetch devices and sync with Redux state
  useEffect(() => {
    if (data?.userDevices?.length > 0) {
      setDevices(data.userDevices);
      setDeviceRecords(data.userDevices); // Initialize device records
    }
    if (data?._id) {
      const payload: any = { _id: data._id };
      dispatch(DeviceByOwnerId(payload));
    }
  }, [data, dispatch]);

  // Filter devices by search query or status
  useEffect(() => {
    const filtered = devices.filter((device: any) => {
      // Safely check for device properties before calling toLowerCase()
      const matchesSearch =
        (device.deviceId?.toLowerCase() || '').includes(
          searchQuery.toLowerCase(),
        ) ||
        (device.imei?.toLowerCase() || '').includes(
          searchQuery.toLowerCase(),
        ) ||
        (device.vehicleNo?.toLowerCase() || '').includes(
          searchQuery.toLowerCase(),
        ) ||
        (
          device.deviceTypeDetail?.vehicleTypeName?.toLowerCase() || ''
        ).includes(searchQuery.toLowerCase());
      const matchesStatus = !filter || device.status === filter;
      return matchesSearch && matchesStatus;
    });

    setDeviceRecords(filtered);
  }, [searchQuery, filter, devices]);

  // Handle search query input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle status filter change
  const handleStatusChange = (selectedOption: any) => {
    setFilter(selectedOption.value);
  };

  const manageDevice = (payload: any) => {
    if (
      loginUser.permissions?.Manage_User?.Update === true ||
      loginUser.role === 'SuperAdmin'
    ) {
      dispatch(manageSingleDevices(payload));
      let newpayload: any = {
        _id: payload?.ownerID,
      };
      dispatch(DeviceByOwnerId(newpayload));
      navigate('/account-management/devices/View-Devices');
    }
  };

  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  const GetsubscribersAll = () => {
    const payload: any = {};
    Object.assign(payload, { role: 'Dealer' });
    dispatch(Getsubscribers(payload));
  };
  useEffect(() => {
    GetsubscribersAll();
  }, []);
  const propsData = {
    title: 'List of All Devices',
  };
  if (
    loginUser.permissions?.Manage_User?.Add ||
    loginUser.role === 'SuperAdmin'
  ) {
    Object.assign(propsData, {
      redirect: 'account-management/manage-subscriber/add-device',
    });
    Object.assign(propsData, { button: 'Add New +' });
  }
if(loginUser.role=="SuperAdmin"){
  Object.assign(propsData, { button3: "Download Device's" });

}
 const handledownload = async () => {
    try {
      const payload: any = {
        ownerID:data._id
      };
      let response = await dispatch(downloadDevices(payload));
      // Ensure we have a valid file URL
      if (response.payload?.data?.data) {
        const fileUrl = `${import.meta.env.VITE_APP_Image_Url}${response.payload.data.data}`; // Construct full URL
        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = response.payload.data.data.split("/").pop(); // Extract file name from URL
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error("Download failed: No file URL received");
      }
    } catch (error) {
      console.error("Error while downloading:", error);
    }
  };

  return (
    <>
      <CommonHeader propsData={propsData} handledownload={handledownload} />

      {/* Search and Filter Section */}
      {(loginUser.permissions?.Manage_User?.View === true ||
        loginUser.role === 'SuperAdmin') && (
        <>
          <div className="searchitem grid grid-cols-3 gap-4 my-2 py-1">
            <div className="col-span-2 relative w-full">
              <input
                className="px-10 py-2 border border-gray-300 w-full rounded-2xl focus:border-gray-300 focus:outline-none pl-12"
                placeholder="Search Devices"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="col-span-1 text-center">
              <Select
                options={statusOptions}
                placeholder="Select Filter"
                isSearchable={false}
                onChange={handleStatusChange}
                value={statusOptions.find((option) => option.value === filter)}
                styles={{
                  control: (provided: any) => ({
                    ...provided,
                    minHeight: '38px',
                    backgroundColor: '#000',
                    borderRadius: '9999px',
                    border: 'none',
                    paddingTop: '2px',
                    paddingBottom: '2px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }),
                  placeholder: (provided: any) => ({
                    ...provided,
                    color: '#D9E821',
                    textAlign: 'center',
                  }),
                  option: (provided: any, state: { isSelected: boolean }) => ({
                    ...provided,
                    color: '#000',
                    textAlign: 'center',
                  }),
                  singleValue: (provided: any) => ({
                    ...provided,
                    color: '#D9E821',
                    textAlign: 'center',
                  }),
                }}
              />
            </div>
          </div>

          {/* Device List Section */}
          <div className="xl:pb-1">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                {/* Table Header */}
                <thead>
                  <tr className="bg-gray-2 dark:bg-meta-4 font-semibold text-base">
                    <th className="p-1.5 xl:p-2 text-center">No#</th>
                    <th className="p-1.5 xl:p-2 text-center">Device ID</th>
                    <th className="p-1.5 xl:p-2 text-center">IMEI No.</th>
                    <th className="p-1.5 xl:p-2 text-center">Sim No.</th>
                    <th className="p-1.5 xl:p-2 text-center">Type</th>
                    <th className="p-1.5 xl:p-2 text-center">Status</th>
                    <th className="p-1.5 xl:p-2 text-center">Vehicle No.</th>
                    <th className="p-1.5 xl:p-2 text-center">Reg. Date</th>
                    <th className="p-1.5 xl:p-2 text-center">Manage</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {deviceRecords.map((device: any, i) => (
                    <tr
                      key={device._id}
                      className="border-b border-stroke dark:border-strokedark text-black text-[15px] font-medium"
                    >
                      <td className="p-1.5 xl:p-2 text-center">{i + 1}</td>
                      <td className="p-1.5 xl:p-2 text-center">
                        {device?.deviceTypeDetail?.deviceId}
                      </td>
                      <td className="p-1.5 xl:p-2 text-center">
                        {device.imei}
                      </td>
                         <td className="p-1.5 xl:p-2 text-center">
                        {device.deviceSimNumber}
                      </td>
                      <td className="p-1.5 xl:p-2 text-center">
                        {device.vehicleTypeDetails?.vehicleTypeName ||
                          'No Type'}
                      </td>
                      <td className="p-1.5 xl:p-2 text-center">
                        <span
                          className={`text-${
                            device.status === 'Active' ? 'green' : 'red'
                          }-500`}
                        >
                          {device.status}
                        </span>
                      </td>
                      <td className="p-1.5 xl:p-2 text-center">
                        {device.vehicleNo}
                      </td>
                      <td className="p-1.5 xl:p-2 text-center">
                        {new Date(device.dateAdded).toLocaleDateString()}
                      </td>
                      <td className="p-1.5 xl:p-2 text-center flex justify-center">
                        <p
                          onClick={() => manageDevice(device)}
                          className="text-[#02B754] cursor-pointer"
                        >
                          <FaEye style={{ fontSize: '24px' }} />
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListOfDevices;
