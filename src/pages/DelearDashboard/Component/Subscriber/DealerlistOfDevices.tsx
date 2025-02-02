import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { DeviceByOwnerId, manageSingleDevices } from "../../../../api/Device";
import { AppDispatch } from "../../../../store/store";
import Select from "react-select";
import { Getsubscribers } from "../../../../api/users";
import CommonHeader from "../../../../common/CommonHeader";

interface Device {
  _id: string;
  deviceId: string;
  imei: string;
  vehicleTypeDetails?: {
    vehicleTypeName: string;
  };
  status: "Active" | "InActive";
  vehicleNo: string;
  dateAdded: string;
}

const DealerlistOfDevices: React.FC = () => {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [deviceRecords, setDeviceRecords] = useState<Device[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: any) => state.subscriber.singleSubscriber);

  useEffect(() => {
    if (data?.userDevices?.length > 0) {
      setDevices(data.userDevices);
      setDeviceRecords(data.userDevices);
    }
    if (data?._id) {
      const payload: any = { _id: data._id };
      dispatch(DeviceByOwnerId(payload));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const filtered = devices.filter((device) => {
      const matchesSearch =
        (device.deviceId?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (device.imei?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (device.vehicleNo?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (device.vehicleTypeDetails?.vehicleTypeName?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        );

      const matchesStatus = !filter || device.status === filter;
      return matchesSearch && matchesStatus;
    });

    setDeviceRecords(filtered);
  }, [searchQuery, filter, devices]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (selectedOption: any) => {
    setFilter(selectedOption.value);
  };

  const manageDevice = (payload: any) => {
      dispatch(manageSingleDevices(payload));
      let newpayload: any = {
        _id: payload?.ownerID,
      };
      dispatch(DeviceByOwnerId(newpayload));
      navigate("/DealerViewDevices");
  };

  const statusOptions = [
    { value: "", label: "All" },
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  const GetsubscribersAll = () => {
    const payload: any = {};
    Object.assign(payload, { filter: "Dealer" });
    dispatch(Getsubscribers(payload));
  };

  useEffect(() => {
    GetsubscribersAll();
  }, []);

  const propsData = {
    title: "List of All Devices",
    button: "Add New +",
    redirect: "DealerAddDevices",
  };
console.log(deviceRecords,"deviceRecordsdeviceRecords")
  return (
    <>
      <CommonHeader propsData={propsData} />
      <div className="searchitem md:grid sm:flex sm:flex-col sm:gap-2 md:grid-cols-3 gap-4 my-2 py-1">
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
        <div className="col-span-1  text-center sm:pt-2 md:pt-0">
          <Select
            options={statusOptions}
            placeholder="Select Filter"
            isSearchable={false}
            onChange={handleStatusChange}
            value={statusOptions.find((option) => option.value === filter)}
            styles={{
              control: (provided: any) => ({
                ...provided,
                minHeight: "38px",
                backgroundColor: "#000",
                borderRadius: "9999px",
                border: "none",
                paddingTop: "2px",
                paddingBottom: "2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }),
              placeholder: (provided: any) => ({
                ...provided,
                color: "#D9E821",
                textAlign: "center",
              }),
              option: (provided: any, state: { isSelected: boolean }) => ({
                ...provided,
                color: "#000",
                textAlign: "center",
              }),
              singleValue: (provided: any) => ({
                ...provided,
                color: "#D9E821",
                textAlign: "center",
              }),
            }}
          />
        </div>
      </div>

      {/* Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 font-satoshi">
        {deviceRecords.map((device:any, index) => (
        <div
        key={device._id}
        className={`border border-gray-300 dark:border-strokedark ${
          device.status === "Active" ? "bg-[#FFF4F5]" : "bg-[#EDF7FD]"
        } dark:bg-meta-4 rounded-lg shadow-sm flex flex-col justify-between`}
      >
      
            <div className="p-4">
           <div className=" flex  justify-between items-center">
           <h2 className="text-sm font-normal text-[#9F9EA2] ">
           <span className="text-[#949495]">#{index+1}</span> Device ID: <span className="text-[#000]">{device?.deviceTypeDetail?.deviceId}</span>
            </h2>
            <p className="font-normal  text-sm bg-[#D9E821] py-2 px-8 rounded-sm text-[#000] ">
            {device.vehicleTypeDetails?.vehicleTypeName || "No Type"}
            </p>
           </div>
            <p className="text-sm text-[#000000] font-normal">   <span className="text-[#9F9EA2] text-sm">Imei:</span> {device.imei}</p>
           
            <p
                className={`text-sm flex items-center mt-2 ${
                    device.status === "Active" ? 'text-green-500' : 'text-red-500'
                }`}
              >
                <span className="mr-2">
                  {device.status === "Active" ? '⚡' : '🔴'}
                </span>
                Status: {device.status}
              </p>
            <p className="text-sm text-[#000000] py-2">
              <span className="text-[#9F9EA2] text-sm">Added On:</span> {new Date(device.createdAt).toLocaleDateString()}
            </p>
            </div>
            <button
              onClick={() => manageDevice(device)}
              className="mt-4 bg-[#000000] text-[#D9E821]  px-4 py-2  rounded-br-[10px] rounded-bl-[10px]"
            >
              Manage 
              {/* <FaEye className="inline ml-2" /> */}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DealerlistOfDevices;
