import React, { useEffect } from 'react';
import CommonTable from '../../../../common/Table/CommonTable';
import Pagination from '../../../../common/Loader/Pagination';
import { RenewColumnKey } from './RenewColumnKey';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { getRenewRequest } from '../../../../api/Device';
import { useNavigate } from 'react-router-dom';

function Renew() {
      const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  
  const navigate=useNavigate()
  const subscriber: any = [];
  const total = 5;
  const itemsPerPage = 10;
  const currentPage: any = 1;
  const setCurrentPage: any = 10;
  const handleRowClick = () => {
    if(!loginUser?.permissions?.Renew_Request?.Update && loginUser.role!=="SuperAdmin") return
navigate("/support/Renew/manage")
  };
  const dispatch = useDispatch<AppDispatch>();
  const renewdata = useSelector((state: any) => state.subscriber.reneqrequest);
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
      {loginUser?.permissions?.Renew_Request?.View || loginUser.role=="SuperAdmin"?(  <div>
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
      </div>):(null)}
    
    </div>
  );
}

export default Renew;
