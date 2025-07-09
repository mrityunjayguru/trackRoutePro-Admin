import React, { useEffect } from 'react';
import LeftDashboard from './Component/LeftDashboard';
import RightDashboard from './Component/RightDashboard';
import SalesHierarchyTable from './Component/SalesHierarchyTable';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { salesDashboard, TslDashboard } from '../../../api/ecomm/salesTeam';
import TSLSalesHierarchyTable from './Component/Tsl';

function EcommDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const dashboard=useSelector((state:any)=>state?.slesTeame?.dashboard)

  const userData = useSelector((state: any) => state.Auth?.loginUserData);
  const salesTable = useSelector((state: any) => state?.slesTeame?.userSales);

  console.log(userData,"userDatauserData")
 useEffect(() => {
  const payload: any = {};

  if (userData?.designation?.designation === "TSL") {
    payload.tlId = userData?._id;
    dispatch(TslDashboard(payload)); // dispatch AFTER setting tlId
  } else {
    dispatch(salesDashboard(payload));
  }
}, [dispatch, userData]);



  return (
    <>
      {userData.role == 'SuperAdmin' && (
        <div className="flex gap-2 w-full h-[65vh]">
          <div className="w-[60%]">
            <LeftDashboard />
          </div>
          <div className="w-[40%]">
            <RightDashboard />
          </div>
        </div>
      )}
      {userData?.designation?.designation=="TSL" || userData?.designation?.designation=="SSM"?(  <div className="bg-[#F2F6F9] rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-medium text-[#1A1D1F]">Employee of the month</h2>
          <select className="border rounded px-3 py-1 text-sm">
            <option>Last month</option>
          </select>
        </div>
        <h3 className="text-lg font-bold text-[#000000]">{dashboard?.highestSales?.name}</h3>
        {/* <p className="text-sm text-[#1A1D1F] font-[400] mt-1">
          for achieving outstanding performance with total sales of ₹ <span className="font-bold">{dashboard?.highestSales?.totalSales}</span> in the last month!
        </p> */}
      </div>):(null)}
   
      {userData?.designation?.designation=="TSL"?(<TSLSalesHierarchyTable data={salesTable}/>):(<SalesHierarchyTable data={salesTable} />)}
    </>
  );
}

export default EcommDashboard;
