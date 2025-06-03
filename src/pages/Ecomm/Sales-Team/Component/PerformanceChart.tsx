interface DesignationData {
  designation?: string;
}

interface PerformanceData {
  fullName: string;
  designationData?: DesignationData;
  employeecode: string;
  // Add other fields like devicesSold, revenue, etc. if dynamic
}

const PerformanceChart = ({ val }: { val: PerformanceData }) => {
  console.log(val, "valvalval");

  return (
    <div className="w-1/2 p-4">
      <h3 className="text-lg font-semibold mb-2">Performance Chart</h3>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-lg">{val.fullName || "N/A"}</div>
            <div className="text-sm text-gray-500">{val.designationData?.designation || "N/A"}</div>
          </div>
          <div className="flex gap-2">
            <button className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">Life Time</button>
            <select className="text-xs border rounded px-2 py-1">
              <option>June 2025</option>
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-sm text-gray-700">
          <div>Employee Code: <strong>{val.employeecode || "N/A"}</strong></div>
          <div>Primary Mobile No.: <strong>8123372131</strong></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 text-center text-sm">
          <div className="bg-gray-100 p-2 rounded">Total Devices Sold<br /><strong>60</strong></div>
          <div className="bg-gray-100 p-2 rounded">Total Revenue Generated<br /><strong>₹90,000</strong></div>
          <div className="bg-gray-100 p-2 rounded">Target Achievement Rate<br /><strong>98%</strong></div>
          <div className="bg-gray-100 p-2 rounded">Deal Closed<br /><strong>29</strong></div>
          <div className="bg-gray-100 p-2 rounded">Attendance<br /><strong>24</strong></div>
          <div className="bg-gray-100 p-2 rounded"></div>
        </div>

        <button className="mt-6 w-full bg-black text-yellow-400 py-2 rounded">
          Download Individual Report
        </button>
      </div>
    </div>
  );
};

export default PerformanceChart;
