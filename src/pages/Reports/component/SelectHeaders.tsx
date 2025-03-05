import { useEffect, useState } from 'react';
import {
  FaCalendarAlt,
  FaSearch,
  FaEye,
  FaCloudDownloadAlt,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { DeviceByOwnerId } from '../../../api/Device';
import {
  distanceReport,
  eventReports,
  setBlanckData,
  stopAndIdols,
  summaryReports,
  traivelReport,
  tripSummary,
  AlertsReport,
} from '../../../api/Reports';
import Select from 'react-select';
export default function SummaryFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state.subscriber.userDevices);
  const imeiRecords = useSelector(
    (state: any) => state?.userReport?.reportType,
  );

  const [showCustomRange, setShowCustomRange] = useState<any>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [imei, setImeino] = useState('');
  const [eventType, setEventType] = useState<string[]>([]);
const [mingap,setminmingap]=useState("")
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const datas: any = [
    { value: 'door', label: 'Door' },
    { value: 'parking', label: 'Parking' },
    { value: 'Battery', label: 'Battery' },
    { value: 'Fuel', label: 'Fuel' },
    { value: 'Speed', label: 'Speed' },
    { value: 'ac', label: 'AC' },
    { value: 'Area', label: 'Area' },
    { value: 'Ignition', label: 'Ignition' },
    { value: 'Security', label: 'Security' },
  ];
  useEffect(() => {
    const payload: any = {};
    dispatch(DeviceByOwnerId(payload));
  }, [dispatch]);

  const handleReportAction = async (actionType: string) => {
    const payload: any = {
      deviceId: selectedVehicles,
      days: showCustomRange,
      eventType: eventType,
    };
    if(mingap)
      Object.assign(payload,{mingap:mingap})
    if (startDate) payload.startDate = startDate;
    if (endDate) payload.endDate = endDate;

    let response;
    const reportActions: Record<string, any> = {
      'Travel Report': summaryReports,
      Summary: traivelReport,
      'Trip Report': tripSummary,
      'Events Report': eventReports,
      'Distance Report': distanceReport,
      'Stop Idle Report': stopAndIdols,
      'Alerts Report': AlertsReport,
    };
    if (imeiRecords.name in reportActions) {
      response = await dispatch(reportActions[imeiRecords.name](payload));
    }

    if (actionType === 'download' && response?.payload?.data?.files) {
      const fileUrl = `${import.meta.env.VITE_APP_Image_Url}${
        response.payload.data.files
      }`;
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = response.payload.data.files.split('/').pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleVehicleSelection = (vehicle: any) => {
    setSelectedVehicles((prev) =>
      prev.includes(vehicle.imei)
        ? prev.filter((v) => v !== vehicle.imei)
        : [...prev, vehicle.imei],
    );
  };
  useEffect(() => {
    const payload: any = {};
    dispatch(setBlanckData(payload));
  }, [dispatch]);
  return (
    <div className="w-full">
      <div className="flex items-center space-x-2">
        <div className="bg-lime-300 p-2 rounded-lg">
          <span className="text-xl">📋</span>
        </div>
        <h2 className="text-lg font-semibold">Summary</h2>
      </div>
      <div className="flex items-center space-x-4 mt-5">
        <button
          className="bg-gray-100 rounded-lg p-2 px-10 text-sm"
          onClick={() => setShowVehicleModal(true)}
        >
          {selectedVehicles.length
            ? selectedVehicles.join(', ')
            : 'Select Vehicle'}
        </button>
        <select
          className="bg-gray-100 rounded-lg p-2 px-10 text-sm"
          onChange={(e) => setShowCustomRange(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="sevendays">Last 7 Days</option>
          <option value="custom">Custom Range</option>
        </select>

        {imeiRecords.name === 'Alerts Report' && (
          <div className="w-full">
            <Select
              options={datas}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selected) =>
                setEventType(selected.map((item: any) => item.value))
              }
              value={datas.filter((option:any) => eventType.includes(option.value))}
              placeholder="Select Events"
            />
          </div>
        )}

        {imeiRecords.name === 'Stop Idle Report' && (
          <div className="">
      <input onChange={(e:any)=>setminmingap(e.target.value)} className='bg-gray-100 rounded-lg p-2 px-10 text-sm' type="number" placeholder='Minimum Stop Minutes' />
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={() => handleReportAction('view')}
            className="w-10 h-10 bg-black rounded-lg flex items-center justify-center"
          >
            <FaEye className="text-yellow-400 text-lg" />
          </button>
          <button
            onClick={() => handleReportAction('download')}
            className="w-10 h-10 bg-lime-300 rounded-lg flex items-center justify-center"
          >
            <FaCloudDownloadAlt className="text-black text-lg" />
          </button>
        </div>
      </div>

      {showVehicleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-96 rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Search Device</h3>
            <div className="flex items-center border p-2 rounded-lg bg-gray-100 mb-3">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Vehicle"
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {data.map((vehicle: any) => (
                <div
                  key={vehicle.imei}
                  className="flex justify-between items-center p-2 hover:bg-gray-200 cursor-pointer"
                >
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedVehicles.includes(vehicle.imei)} // Corrected from "iemi" to "imei"
                      onChange={() => handleVehicleSelection(vehicle)}
                    />
                    <span>{vehicle?.vehicleNo}</span>
                  </label>
                  <span className="text-gray-500 text-sm">{vehicle.imei}</span>{' '}
                  {/* Ensure it's displaying the correct imei */}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              <button
                className="w-1/2 border py-2 rounded-lg mr-2"
                onClick={() => setShowVehicleModal(false)}
              >
                Cancel
              </button>
              <button
                className="w-1/2 bg-blue-500 text-white py-2 rounded-lg"
                onClick={() => setShowVehicleModal(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showCustomRange === 'custom' && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-80 bg-white shadow-lg p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Custom Range</h3>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
          />
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4"
          />
          <button
            className="w-full bg-black text-yellow-400 py-2 rounded-lg mb-2"
            onClick={() => setShowCustomRange(false)}
          >
            Apply
          </button>
          <button
            className="w-full border py-2 rounded-lg"
            onClick={() => setShowCustomRange(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
