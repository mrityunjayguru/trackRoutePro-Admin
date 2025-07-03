type SubscriberExp = {
  name: string;
  code: string;
  imei: string;
  subscriptionexp: string;
};

export const ExpiringSubscriptions = ({subscriberExp}: {subscriberExp: SubscriberExp[]}) => {

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
            {subscriberExp?.map((item: SubscriberExp, index: number) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.code}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.imei}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.subscriptionexp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
