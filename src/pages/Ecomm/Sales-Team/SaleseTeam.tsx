import React, { useEffect, useState } from 'react';
import AddOnstable from './Component/SalesTeamTable';
import RelayForm from './Component/RelayForm';
import SalesTeamForm from './Component/SalesTeamForm';
import { useDispatch, useSelector } from 'react-redux';
import PerformanceChart from './Component/PerformanceChart';
import TeamPerformance from './Component/TeamPerformance';
import { handlePerformence } from '../../../api/ecomm/salesTeam';
import { AppDispatch } from '../../../store/store';
import ApplicationTable from './Component/Application/ApplicationTable';
// ApplicationTable 
const tabs:any = [
  { label: 'Team', key: 'Team' },
  { label: 'Onboard', key: 'onboard' },
  { label: 'Designation', key: 'Designation' },
  { label: 'Performence', key: 'Performence' },
  { label: 'Leave Applications', key: 'LeaveApplications' },

];

function SaleseTeam() {
  const dispatch=useDispatch<AppDispatch>()
  const [activeTab, setActiveTab] = useState('Team');
  const updateSalesTeam = useSelector((state: any) => state?.slesTeame?.updateSalesTeam);
  const performance= useSelector((state: any) => state?.slesTeame?.performance);


  useEffect(()=>{
    const payload:any=null
     dispatch(handlePerformence(payload));

setActiveTab("onboard")
  },[updateSalesTeam])
useEffect(()=>{
setActiveTab("Performence")
},[performance])
  return (
    <div className="pb-20"> {/* padding-bottom to avoid hidden content behind fixed nav */}
      {/* Top Navigation Tabs */}
      <div className="topnav">
        {tabs.map((tab:any) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'Team' && <AddOnstable />}
        {activeTab === 'onboard' && <SalesTeamForm/>}
        {activeTab === 'Designation' && <RelayForm />}
        {activeTab === 'Performence' &&  <TeamPerformance/>}
        {activeTab === 'LeaveApplications' &&  <ApplicationTable/>}


      </div>
    </div>
  );
}

export default SaleseTeam;
