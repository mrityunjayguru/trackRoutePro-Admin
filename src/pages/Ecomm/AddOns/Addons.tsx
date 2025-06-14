import React, { useEffect, useState } from 'react';
import AddOnsForm from './Component/AddOnsForm';
import AddOnstable from './Component/AddOnstable';
import RelayForm from './Component/RelayForm';
import AddonForm from './Component/AddOnsForm';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateaddOns } from '../../../api/ecomm/addOns';
import { AppDispatch } from '../../../store/store';

const tabs = [
  { label: 'Catalogue', key: 'catalogue' },
  { label: 'Onboard', key: 'onboard' },
  { label: 'Relay', key: 'relay' },
];

function Addons() {
  const [activeTab, setActiveTab] = useState('catalogue');
  const updateData=useSelector((state:any)=>state.addOns?.singleaddOns)
 const dispatch=useDispatch<AppDispatch>()
  useEffect(()=>{
    if(updateData){
setActiveTab("onboard")
    }
  },[updateData])
  useEffect(()=>{
return()=>{
  let val:any=null
       dispatch(setUpdateaddOns(val));
  
}
  },[])
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
        {activeTab === 'catalogue' && <AddOnstable />}
        {activeTab === 'onboard' && <AddonForm />}
        {activeTab === 'relay' && <RelayForm />}
      </div>
    </div>
  );
}

export default Addons;
