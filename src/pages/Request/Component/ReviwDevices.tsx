import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store/store';
import { DeviceByOwnerId, manageSingleDevices } from '../../../api/Device';
import CommonTable from '../../../common/Table/CommonTable';
import { RequestTableColumn } from './RequestTableKeys';
import Pagination from '../../../common/Loader/Pagination';
import { DevicesKeys } from './DevicesKeys';

function ReviwDevices() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this value as needed
  const total = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleRowClick = (payload: any) => {
    dispatch(manageSingleDevices(payload));
    let newpayload: any = {
      _id: payload?.ownerID,
    };
    dispatch(DeviceByOwnerId(newpayload));
    navigate('/support/dealers/view-Device');
  };
  const userDevices = useSelector((state: any) => state.subscriber.userDevices);
  console.log(userDevices, 'userDevicesuserDevices');
  const getMapDetails = async () => {
    const payload: any = {
      isAppCreated: true,
    };
    await dispatch(DeviceByOwnerId(payload));
  };

  useEffect(() => {
    getMapDetails();
  }, []);

  return (
    <div>
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
