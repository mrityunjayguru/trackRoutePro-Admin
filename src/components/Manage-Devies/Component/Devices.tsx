import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { DeviceByOwnerId, GetDealearRecord, manageSingleDevices } from '../../../api/Device';
import CommonTable from '../../../common/Table/CommonTable';
import { DevicesKeys } from '../../../pages/Request/Component/DevicesKeys';
import Pagination from '../../../common/Loader/Pagination';
import { useNavigate } from 'react-router-dom';
import SearchAndFilter from '../../../common/SearchAndFilter';
function Devices() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate()
  const devices=useSelector((state:any)=>state.subscriber?.userDevices)
    const DealerRecord = useSelector(
      (state: any) => state?.subscriber?.DelearCode,
    );
  const [currentPage, setCurrentPage] = useState(1);
  const total = 10;
  const itemsPerPage = 10; // Adjust this value as needed
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    getrecords();
  }, []);

  const getrecords = async () => {
    try {
      const payload: any = {
        search:search,
      };
      if(filter)Object.assign(payload,{delearCode:filter})
      if(startDate)Object.assign(payload,{startDate:new Date(startDate)})
      if(endDate)Object.assign(payload,{endDate:new Date(endDate)})


      const payload3:any={}
      await dispatch(DeviceByOwnerId(payload));
         await dispatch(GetDealearRecord(payload3));
    } catch (err) {
      console.log(err);
    }
  };

   const handleRowClick = (payload: any) => {
      dispatch(manageSingleDevices(payload)); 
      let newpayload: any = {
        _id: payload?.ownerID
      };
      dispatch(DeviceByOwnerId(newpayload));
      navigate("/Manage-device/view-map")
    };
    const handleSearchChange = (val: string) => {
      setSearch(val);
    };
    const dealearRecord: any = DealerRecord?.map((dealer: any) => ({
      label: dealer.uniqueCode,
      value: dealer._id,
    }));
    const statusOptions = dealearRecord
    const handleStatusChange = (e: any) => {
      setFilter(e.value);
      setCurrentPage(1); // Reset to first page when filter changes
    };
    useEffect(()=>{
      getrecords()
    },[search,filter,startDate,endDate])
  return   <div>
 <div className="space-y-4 p-4 bg-white rounded-lg shadow">
  <SearchAndFilter
    statusOptions={statusOptions}
    onSearchChange={handleSearchChange}
    onStatusChange={handleStatusChange}
    filter={filter}
  />
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label htmlFor="start-date" className="text-sm font-medium text-gray-700">
        Start Date
      </label>
      <input
        type="date"
        id="start-date"
        className="mt-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        onChange={(e)=>setStartDate(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="end-date" className="text-sm font-medium text-gray-700">
        End Date
      </label>
      <input
        type="date"
        id="end-date"
        className="mt-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        onChange={(e)=>setEndDate(e.target.value)}

      />
    </div>
  </div>
</div>


  <div className="mt-5">
    <CommonTable
      columns={DevicesKeys}
      data={devices} // Ensure this is correctly set with fetched data
      onRowClick={handleRowClick}
      currentPage={currentPage}
    />
  </div>
  
  <div>
    <Pagination
      totalCount={total}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  </div>
</div>;
}

export default Devices;
