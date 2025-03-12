import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { DeviceByOwnerId, manageSingleDevices } from '../../../api/Device';
import CommonTable from '../../../common/Table/CommonTable';
import { DevicesKeys } from '../../../pages/Request/Component/DevicesKeys';
import Pagination from '../../../common/Loader/Pagination';
import { useNavigate } from 'react-router-dom';
import SearchAndFilter from '../../../common/SearchAndFilter';
function Devices() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate()
  const devices=useSelector((state:any)=>state.subscriber?.userDevices)
  const [currentPage, setCurrentPage] = useState(1);
  const total = 10;
  const itemsPerPage = 10; // Adjust this value as needed
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getrecords();
  }, []);

  const getrecords = async () => {
    try {
      const payload: any = {
        search:search,
      };
      await dispatch(DeviceByOwnerId(payload));
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
    const statusOptions:any = [
    ];
    const handleStatusChange = (e: any) => {
      setFilter(e.value);
      setCurrentPage(1); // Reset to first page when filter changes
    };
    useEffect(()=>{
      getrecords()

    },[search])
  return   <div>
      <SearchAndFilter
        statusOptions={statusOptions}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        filter={filter}
      />

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
