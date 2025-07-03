import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, ChevronDown } from 'lucide-react'; // Importing icons from lucide-react
import { formatDateToDDMMMYYYYwithTime, formatDateToYMDHM } from '../../../../../common/ManageDate';
import { getAddressFromCoords } from '../../../../../common/getLocation';
interface UserRecord {
  targetAchievedPercentage?: string;
  devicesSold?: string;
  totalVisits?: string;
  target?: string;
  visitrecord:any;
  totalDeals:any;
  totalsellrevenue:any
  location:any;
}

interface UserProfileProps {
  record: UserRecord;
}
const RightPerformnce: React.FC<UserProfileProps> = ({ record })  => {
  // Dummy data for the client visits table
  const clientVisitsData:any = [
    { sNo: 1, clientName: 'Ian Molina', date: '24 May 2025', outcome: 'Ongoing' },
    { sNo: 2, clientName: 'Campbell King', date: '18 May 2025', outcome: 'Sale Generated' },
    { sNo: 3, clientName: 'Corbin French', date: '14 May 2025', outcome: 'Differed' },
  ];
  const [data,setData]=useState<any>(null)
  const [address, setaddress] = useState<string | undefined>(undefined)
const handleClikc=(val:any)=>{

setData(val)
}
useEffect(() => {
  const fetchAddress = async () => {
    if (data?.location?.latitude && data?.location?.longitude) {
       const url = `https://nominatim.openstreetmap.org/reverse?lat=${data?.location?.latitude}&lon=${data?.location?.longitude}&format=json`;
       const { data: responseData } = await axios.get<{ display_name: string }>(url, {
      headers: {
      'User-Agent': 'YourAppNameHere'
    }
  });
      setaddress(responseData.display_name);
    }
  };
  fetchAddress();
}, [data]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      {/* Top Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="text-gray-600 text-sm">
            <span className="text-red-500">*</span> Minimum Value of Target
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Target Achieved</div>
            <div className="text-3xl font-bold text-green-500">{record?.targetAchievedPercentage}%</div>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Devices Sold</div>
            <div className="text-3xl font-bold text-gray-800">{record?.devicesSold}</div>
            <div className="text-xs text-gray-500">/35*</div>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Deals Closed</div>
            <div className="text-3xl font-bold text-gray-800">{record?.totalDeals}</div>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Client Visits</div>
            <div className="text-3xl font-bold text-gray-800">{record?.totalVisits}</div>
            {/* <div className="text-xs text-gray-500">/230*</div> */}
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Total Sell</div>
            <div className="text-3xl font-bold text-gray-800">{record?.totalsellrevenue[0]?.totalsellrevenue}</div>
          </div>
        </div>
        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
          <button className="bg-[#000000] text-[#D9E821]  px-6 py-3 rounded-lg font-semibold shadow  transition-colors">
            Download Full Report
          </button>
          <button className="bg-[#000000] text-[#D9E821]  px-6 py-3 rounded-lg font-semibold shadow  transition-colors">
            Download Invoices
          </button>
        </div>
      </div>

      {/* Bottom Section: Client Visits and Details */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Card: Image and Location */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:w-1/3 flex flex-col items-start">
          <div className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Client Visit Preivew</div>
          <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
            {/* Placeholder image */}
            <img
              src={`${import.meta.env.VITE_APP_Image_Url}${data?.photoProofUrl}`}
              alt="Work Space"
              className="w-full h-full object-cover"
              onError={(e:any) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/D1D5DB/4B5563?text=Error+Loading"; }}
            />
          </div>
          <div className="text-gray-700 text-sm mb-2">Clock-in Time : {formatDateToYMDHM(data?.startTime)}</div>
          <div className="text-gray-700 text-sm">Location : {data?.clientLocation || "NA"}</div>
          <div className="text-gray-700 text-sm">Address : {address || "NA"}</div>
        </div>

        {/* Right Card: Client Visits Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:w-2/3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Client Visits</h2>
            <div className="flex space-x-2 w-full md:w-auto">
              {/* <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div> */}
            
            </div>
          </div>

          {/* Client Visits Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Name
                  </th>
                  {/* <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th> */}
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Outcome
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {record?.visitrecord?.map((visit:any, index:any) => (
                  <tr key={index}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{index+1}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{visit.clientName}</td>
                    {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(visit.startTime).toLocaleString()}</td> */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{visit.outcome}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900" onClick={()=>handleClikc(visit)}>
                      {/* Custom Eye Icon (SVG) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-indigo-500 hover:text-indigo-700 cursor-pointer"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </td>
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

export default RightPerformnce;
