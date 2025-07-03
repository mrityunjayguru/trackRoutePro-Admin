export const TopDealers = () => {
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