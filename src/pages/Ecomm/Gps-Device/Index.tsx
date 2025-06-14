import React, { useEffect, useState } from 'react';
import DeviceForm from './component/DeviceForm';
import DeviceTable from './component/DeviceTable';
import { useDispatch, useSelector } from 'react-redux';
import Category from './Catrgory/Category';
import { setUpdateGpsDevices } from '../../../api/ecomm/gpsDevices';
import { AppDispatch } from '../../../store/store';



function DiscountCopoun() {
  const [activeTab, setActiveTab] = useState('catalogue');
  const dispatch=useDispatch<AppDispatch>()
    const updatedPayload=useSelector((state:any)=>state.gpsDevices?.updateDevice)
  const tabs:any = [
  { label: 'Catalogue', key: 'catalogue' },
  { label: 'Category', key: 'Category' },
  { label: 'Onboard', key: 'Onboard' },
];
useEffect(()=>{
  if(updatedPayload){
setActiveTab("Onboard")

  }
},[updatedPayload])
useEffect(()=>{
return()=>{
  const payload2:any=null
      // Clear form and redux state
       dispatch(setUpdateGpsDevices(payload2));
}
},[])
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
