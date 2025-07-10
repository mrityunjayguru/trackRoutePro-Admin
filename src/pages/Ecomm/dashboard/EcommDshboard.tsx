import React, { useEffect, useState } from 'react';
import LeftDashboard from './Component/LeftDashboard';
import RightDashboard from './Component/RightDashboard';
import SalesHierarchyTable from './Component/SalesHierarchyTable';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { salesDashboard, TslDashboard } from '../../../api/ecomm/salesTeam';
import TSLSalesHierarchyTable from './Component/Tsl';
import InvoiceDatePicker from '../Sales-Team/Component/Perforemance/InvoiceDatePicker';

function EcommDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const dashboard=useSelector((state:any)=>state?.slesTeame?.dashboard)
 const [selectedDate, setSelectedDate] = useState<any>(null);

  const userData = useSelector((state: any) => state.Auth?.loginUserData);
  const salesTable = useSelector((state: any) => state?.slesTeame?.userSales);

  console.log(userData,"userDatauserData")
 useEffect(() => {
  const payload: any = {
      endDate:selectedDate?.endDate,
        startDate:selectedDate?.startDate,
  };

  if (userData?.designation?.designation === "TSL") {
    payload.tlId = userData?._id;
    dispatch(TslDashboard(payload)); // dispatch AFTER setting tlId
  } else {
    dispatch(salesDashboard(payload));
  }
}, [dispatch, userData,selectedDate]);

 const handleDateChange = (date: any) => {
    setSelectedDate(date);
    console.log('Date from child:', date);
  };
  const handleReload=()=>{
    setSelectedDate(null)
  }

  return (
    <>
         <div className='flex justify-between gap-2 py-4 px-5'>
               <InvoiceDatePicker value={selectedDate} onDateChange={handleDateChange} />
                   <button
            onClick={handleReload}
            className="p-3 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center flex-shrink-0"
            aria-label="Reload invoices"
          >
            {/* Replaced IoReloadOutline with inline SVG for compilation */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.922a2.25 2.25 0 0 1 2.244 2.244v2.071M16.023 9.348A14.945 14.945 0 0 1 12 10.5a14.945 14.945 0 0 1-4.023-1.152M16.023 9.348H9.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </button>
         </div>
    
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
