import React, { useEffect, useState } from 'react';
import AddOnstable from './Component/SalesTeamTable';
import RelayForm from './Component/RelayForm';
import SalesTeamForm from './Component/SalesTeamForm';
import { useSelector } from 'react-redux';

const tabs = [
  { label: 'Team', key: 'Team' },
  { label: 'Onboard', key: 'onboard' },
  { label: 'Designation', key: 'Designation' },
];

function SaleseTeam() {
  const [activeTab, setActiveTab] = useState('Team');
  const updateSalesTeam = useSelector((state: any) => state?.slesTeame?.updateSalesTeam);

  useEffect(()=>{
setActiveTab("onboard")
  },[updateSalesTeam])

  return (
    <div className="pb-20"> {/* padding-bottom to avoid hidden content behind fixed nav */}
      {/* Top Navigation Tabs */}
      <div className="topnav">
        {tabs.map((tab) => (
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
      </div>
    </div>
  );
}

export default SaleseTeam;
