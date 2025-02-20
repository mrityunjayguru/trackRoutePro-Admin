import React, { useEffect } from 'react';
import CommonTable from '../../../../common/Table/CommonTable';
import Pagination from '../../../../common/Loader/Pagination';
import { RenewColumnKey } from './RenewColumnKey';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { getRenewRequest } from '../../../../api/Device';
import { useNavigate } from 'react-router-dom';

function Renew() {
  const navigate=useNavigate()
  const subscriber: any = [];
  const total = 5;
  const itemsPerPage = 10;
  const currentPage: any = 1;
  const setCurrentPage: any = 10;
  const handleRowClick = () => {
navigate("/support/Renew/manage")
  };
  const dispatch = useDispatch<AppDispatch>();
  const renewdata = useSelector((state: any) => state.subscriber.reneqrequest);
  console.log(renewdata, 'renewdata');
  useEffect(() => {
    getmapDetails();
  }, []);
  const getmapDetails = async () => {
    try {
      const payload: any = {};
      dispatch(getRenewRequest(payload));
    } catch (err) {}
  };
  return (
    <div>
      <div>
        <div className="mt-5">
          <CommonTable
            columns={RenewColumnKey}
            data={renewdata}
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
    </div>
  );
}

export default Renew;
