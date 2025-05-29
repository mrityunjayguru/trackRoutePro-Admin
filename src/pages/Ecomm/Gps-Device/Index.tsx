import React, { useState } from 'react';
import DeviceForm from './component/DeviceForm';
import DeviceTable from './component/DeviceTable';

const tabs = [
  { label: 'Catalogue', key: 'catalogue' },
  { label: 'Onboard', key: 'Onboard' },
];

function DiscountCopoun() {
  const [activeTab, setActiveTab] = useState('catalogue');

  return (
    <div className="pb-20 "> {/* padding-bottom to avoid hidden content behind fixed nav */}
      {/* Top Navigation Tabs */}
      <div className="topnav ">
        {tabs.map((tab) => (
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
        {activeTab === 'catalogue' && <DeviceForm />}
        {activeTab === 'Onboard' && <DeviceTable />}
      </div>
    </div>
  );
}

export default DiscountCopoun;
