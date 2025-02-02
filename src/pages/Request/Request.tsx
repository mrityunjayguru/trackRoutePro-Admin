import React, { useEffect, useState } from 'react';
import HeaderCommon from './Component/HeaderCommon';
import CommonTable from '../../common/Table/CommonTable';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../common/Loader/Pagination';
import { getDelearSuports, Getsubscribers, singleSubscribers } from '../../api/users';
import { AppDispatch } from '../../store/store';
import { RequestTableColumn } from './Component/RequestTableKeys';
import { useNavigate } from 'react-router-dom';
function Request() {
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
    dispatch(singleSubscribers(rowData));

    navigat('/ViewRequest');
  };
  const GetsubscribersAll = () => {
    const payload: any = {
      role: 'User',
      isAppCreated:true,
      offset: (currentPage - 1) * itemsPerPage,
    };
    dispatch(getDelearSuports(payload));
  };
  useEffect(() => {
    GetsubscribersAll();
  }, [currentPage]);
  return (
    <div>
      <HeaderCommon />
      <div className="mt-5">
        <CommonTable
          columns={RequestTableColumn}
          data={subscriber}
          onRowClick={handleRowClick} // Optional: Add row click behavior
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
