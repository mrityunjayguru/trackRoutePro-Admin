import React, { useState } from 'react';
import RelayForm from './Component/InvoiceTable';
import InvoiceTable from './Component/InvoiceTable';

const tabs:any = [
  { label: 'Invoice', key: 'Invoice' },
];

function ManageInvoice() {
  const [activeTab, setActiveTab] = useState('Invoice');

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
        {activeTab === 'Invoice' && <InvoiceTable />}
      </div>
    </div>
  );
}

export default ManageInvoice;
