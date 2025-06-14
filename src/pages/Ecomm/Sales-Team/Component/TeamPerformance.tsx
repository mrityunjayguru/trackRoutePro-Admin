

import React, { useEffect } from 'react'
import UserCard from './Perforemance/UserProfile'
import CalendarCard from './Perforemance/PerformanceCalendar'
import ClientVisits from './Perforemance/visit'
import Header from './Perforemance/Header'
import RightPerformnce from './Perforemance/RightPerformnce'
import InvoiceAndDeal from './Perforemance/InvoiceAndDeal'
import AttendanceSummary from './Perforemance/AttendanceSummary'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../../store/store'
import { performanceData } from '../../../../api/ecomm/salesTeam'
import ManageInvoice from './Perforemance/ManageInvoice'

function TeamPerformance() {
  const performance= useSelector((state: any) => state?.slesTeame?.performance);
  const performancedata:any= useSelector((state: any) => state?.slesTeame?.performancedata);


const dispatch=useDispatch<AppDispatch>()
  const getData=async()=>{
    try{
      const payload:any={
userId:performance?._id,
      }
await dispatch(performanceData(payload))
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
getData()
  },[])

  return (
    <div className="">
      <Header />
      <div className="grid grid-cols-[30%_70%] gap-4">
        <div>
          <UserCard record={performancedata?.salesTeam}/>
         <div className='my-5'>
           <CalendarCard attendenceRecord={performancedata?.attendenceRecord} />
         </div>
        </div>
        <div>
          <RightPerformnce record={performancedata} />
        </div>
      </div>
        <div className="">
      <AttendanceSummary performancedata={performancedata?.attendance}
      />
      {/* Other components */}
    </div>
      <ManageInvoice/>
    </div>
  )
}

export default TeamPerformance

