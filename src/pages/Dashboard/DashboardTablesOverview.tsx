import React from 'react';
import { Eye } from 'lucide-react'; // For the eye icon

// --- 1. MaxDistanceCoveredVehicles Component ---
const MaxDistanceCoveredVehicles = () => {
  const data = [
    { name: 'Evelyn Rivera', imei: 'XXXXXXXXXXXXXX', totalDistance: '980' },
    { name: 'Macie Fuller', imei: 'XXXXXXXXXXXXXX', totalDistance: '750' },
    { name: 'Felix Delacruz', imei: 'XXXXXXXXXXXXXX', totalDistance: '150' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Max Distance Covered Vehicles</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">IMEI</th>
              <th className="px-6 py-3">Total Distance</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.imei}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{item.totalDistance}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Eye size={18} className="text-green-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 2. LatestIgnitionON Component ---
const LatestIgnitionON = () => {
  const data = [
    { name: 'Quincy Leonard', userId: 'TRPU0001', imei: '000000000000000', expiryDate: '30 June 2025' },
    { name: 'Charlie Colon', userId: 'TRPD0002', imei: '000000000000000', expiryDate: '1 July 2025' },
    { name: 'Ahmad Ayala', userId: 'TRPD0003', imei: '000000000000000', expiryDate: '27 July 2025' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Latest Ignition ON</h2>
        <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View More</a>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3">IMEI</th>
              <th className="px-6 py-3">Expiry Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.imei}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 3. TopDealers Component ---
const TopDealers = () => {
  const data = [
    { name: 'Evelyn Rivera', dealerCode: 'TRPD0001', totalSales: '200', salesThisMonth: '200' },
    { name: 'Macie Fuller', dealerCode: 'TRPD0002', totalSales: '180', salesThisMonth: '180' },
    { name: 'Felix Delacruz', dealerCode: 'TRPD0003', totalSales: '150', salesThisMonth: '150' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Top Dealers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Dealer Code</th>
              <th className="px-6 py-3">Total Sales</th>
              <th className="px-6 py-3">Sales This Month</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.dealerCode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.totalSales}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.salesThisMonth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 4. ExpiringSubscriptions Component ---
const ExpiringSubscriptions = () => {
  const data = [
    { name: 'Quincy Leonard', userId: 'TRPU0001', imei: '000000000000000', expiryDate: '30 June 2025' },
    { name: 'Charlie Colon', userId: 'TRPD0002', imei: '000000000000000', expiryDate: '1 July 2025' },
    { name: 'Ahmad Ayala', userId: 'TRPD0003', imei: '000000000000000', expiryDate: '27 July 2025' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Expiring Subscriptions</h2>
        <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View More</a>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3">IMEI</th>
              <th className="px-6 py-3">Expiry Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.imei}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Main DashboardTablesOverview Component ---
const DashboardTablesOverview = () => {
  return (
    <div className="bg-gray-100 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Row: Max Distance and Latest Ignition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MaxDistanceCoveredVehicles />
          <LatestIgnitionON />
        </div>

        {/* Bottom Row: Top Dealers and Expiring Subscriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopDealers />
          <ExpiringSubscriptions />
        </div>
      </div>
    </div>
  );
};

export default DashboardTablesOverview;
