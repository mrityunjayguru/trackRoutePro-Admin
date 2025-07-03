import React from 'react';

const ApprovalAndDevicesDashboard = () => {
  const pendingApprovals = [
    { id: 1, name: 'Ean Cooper' },
    { id: 2, name: 'Lacey Cunningham' },
    { id: 3, name: 'Elle White' },
  ];

  const recentlyAddedDevices = [
    { id: 1, name: 'Evelyn Rivera', designation: 'Sales Assistant', employeeCode: 'TRPE0001', discount: 'Approve' },
    { id: 2, name: 'Macie Fuller', designation: 'Sales Lead', employeeCode: 'TRPE0002', discount: 'Approve' },
    { id: 3, name: 'Felix Delacruz', designation: 'Sales Assistant', employeeCode: 'TRPE0003', discount: 'Approve' },
  ];

  return (
    <div className="bg-gray-100 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Pending Approvals Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-red-500 mb-6 border-b-2 border-red-500 pb-2 inline-block">Pending Approvals</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Name</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingApprovals.map((item, index) => (
                  <tr key={item.id} className={`${index % 2 === 1 ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-150`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recently Added Devices Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-red-500 mb-6 border-b-2 border-red-500 pb-2 inline-block">Recently Added Devices</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Designation</th>
                  <th className="px-6 py-3">Employee Code</th>
                  <th className="px-6 py-3">Discount</th>
                  <th></th> {/* Empty header for Deny button column */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentlyAddedDevices.map((item, index) => (
                  <tr key={item.id} className={`${index % 2 === 1 ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-150`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.designation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.employeeCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold cursor-pointer">{item.discount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold cursor-pointer">Deny</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApprovalAndDevicesDashboard;
