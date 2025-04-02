import React from 'react';
import Devices from './Component/Devices';
import VehicleRecord from './Component/VehicleRecord';
import OtherDetail from './Component/OtherDetail';
import { useSelector } from 'react-redux';
function ManageDevices() {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  return (
    <div>
      {loginUser.role == 'SuperAdmin' ? <OtherDetail /> : null}
      {loginUser?.permissions?.Manage_Device?.View ||
      loginUser.role == 'SuperAdmin' ? (
        <Devices />
      ) : null}
    </div>
  );
}

export default ManageDevices;
