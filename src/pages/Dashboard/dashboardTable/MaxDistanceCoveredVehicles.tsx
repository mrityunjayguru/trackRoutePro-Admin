import { Eye } from "lucide-react";

interface MaxDistanceCoveredVehiclesProps {
  distancecovered: Array<{
    user: string;
    deviceIMEI: string;
    maxTotalDistanceCovered: number;
  }>;
}

export const MaxDistanceCoveredVehicles = ({ distancecovered }: MaxDistanceCoveredVehiclesProps) => {
 
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
            {distancecovered?.map((item:any, index:any) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.deviceIMEI}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{item.maxTotalDistanceCovered}</td>
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