import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

type IgnitionStatusItem = {
  Name: string;
  id: string;
  deviceIMEI: string;
};

interface LatestIgnitionONProps {
  igitionstatus: IgnitionStatusItem[];
}

export const LatestIgnitionON = ({ igitionstatus }: LatestIgnitionONProps) => {

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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {igitionstatus?.map((item: { Name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; deviceIMEI: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.Name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.deviceIMEI}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
