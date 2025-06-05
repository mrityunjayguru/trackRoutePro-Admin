import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store/store';
import { DeviceByOwnerId, manageSingleDevices } from '../../../api/Device';
import CommonTable from '../../../common/Table/CommonTable';
import { RequestTableColumn } from './RequestTableKeys';
import Pagination from '../../../common/Loader/Pagination';
import { DevicesKeys } from './DevicesKeys';
import SearchAndFilter from '../../../common/SearchAndFilter';

function ReviwDevices() {
    const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this value as needed
  const total = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setfilter] = useState('InActive');
  const [search, setSearch] = useState('');
  const handleRowClick = (payload: any) => {
    if (!loginUser?.permissions?.Renew_Request?.Update && loginUser?.role !== "SuperAdmin") return;
    dispatch(manageSingleDevices(payload));
    let newpayload: any = {
      _id: payload?.ownerID,
    };
    dispatch(DeviceByOwnerId(newpayload));
    navigate('/support/dealers/view-Device');
  };
  const userDevices = useSelector((state: any) => state.subscriber.userDevices);
  const getMapDetails = async () => {
    const payload: any = {
      isAppCreated: true,
      search:search,
      status:filter,
    };
    await dispatch(DeviceByOwnerId(payload));
  };

  useEffect(() => {
    getMapDetails();
  }, [search,filter]);
  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  const handleSearchChange = (val: any) => {
    setSearch(val);
  };
  const handleStatusChange = (e: any) => {
    setfilter(e.value);
  };

  return (
    <div className='p-5'>
      <SearchAndFilter
        statusOptions={statusOptions}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        filter={filter}
      />
      <div className="mt-5">
        <CommonTable
          columns={DevicesKeys}
          data={userDevices} // Ensure this is correctly set with fetched data
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
    </div>
  );
}

export default ReviwDevices;
