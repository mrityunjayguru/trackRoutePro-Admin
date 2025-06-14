import React, { useEffect, useState } from 'react';
import DeviceForm from './component/DeviceForm';
import DeviceTable from './component/DeviceTable';
import { useSelector } from 'react-redux';
import Category from './Catrgory/Category';

const tabs:any = [
  { label: 'Catalogue', key: 'catalogue' },
  { label: 'Category', key: 'Category' },
  { label: 'Onboard', key: 'Onboard' },
];

function DiscountCopoun() {
  const [activeTab, setActiveTab] = useState('catalogue');
    const updatedPayload=useSelector((state:any)=>state.gpsDevices?.updateDevice)
  
useEffect(()=>{
setActiveTab("Onboard")
},[updatedPayload])
  return (
    <div className="pb-20 "> {/* padding-bottom to avoid hidden content behind fixed nav */}
      {/* Top Navigation Tabs */}
      <div className="topnav ">
        {tabs?.map((tab:any) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-btn ml-5 ${activeTab === tab.key ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 ">
        {activeTab === 'catalogue' && <DeviceTable /> }
        {activeTab === 'Category' && <Category/>}
        {activeTab === 'Onboard' && <DeviceForm />}
      </div>
    </div>
  );
}

export default DiscountCopoun;
