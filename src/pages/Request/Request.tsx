import React, { useEffect, useState } from 'react';
// import HeaderCommon from './Component/HeaderCommon';
import CommonTable from '../../common/Table/CommonTable';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../common/Loader/Pagination';
import { getDelearSuports, singleSubscribers } from '../../api/users';
import { AppDispatch } from '../../store/store';
import { RequestTableColumn } from './Component/RequestTableKeys';
import { useNavigate } from 'react-router-dom';
import SearchAndFilter from '../../common/SearchAndFilter';
function Request() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  const [filter, setfilter] = useState('InActive');
  const [search, setSearch] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const itemsPerPage = 10; // Adjust this value as needed
  const [currentPage, setCurrentPage] = useState(1);
  const navigat = useNavigate();
  const subscriber = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );
  const total: any = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.totalCount,
  );

  const handleRowClick = (rowData: any) => {
    if(loginUser?.permissions?.Renew_Request?.Update || loginUser.role=="SuperAdmin"){
      dispatch(singleSubscribers(rowData));
      navigat('/ViewRequest');
    }
  
  };
  const GetsubscribersAll = () => {
    const payload: any = {
      role: 'User',
      search: search,
      isAppCreated: true,
      offset: (currentPage - 1) * itemsPerPage,
    };
    if(filter=="Active"){
      Object.assign(payload,{status:true})
    }
    if(filter=="InActive"){
      Object.assign(payload,{status:false})
    }
    dispatch(getDelearSuports(payload));
  };
  useEffect(() => {
    GetsubscribersAll();
  }, [currentPage, search, filter]);
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
    <div>
      <SearchAndFilter
        statusOptions={statusOptions}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        filter={filter}
      />
      <div className="mt-5">
        <CommonTable
          columns={RequestTableColumn}
          data={subscriber}
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

export default Request;
