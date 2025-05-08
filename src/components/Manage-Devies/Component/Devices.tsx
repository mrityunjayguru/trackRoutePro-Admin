import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { DeviceByOwnerId, GetDealearRecord, manageSingleDevices } from '../../../api/Device';
import CommonTable from '../../../common/Table/CommonTable';
import { DevicesKeys } from '../../../pages/Request/Component/DevicesKeys';
import Pagination from '../../../common/Loader/Pagination';
import { useNavigate } from 'react-router-dom';
import SearchAndFilter from '../../../common/SearchAndFilter';

interface Dealer {
  _id: string;
  uniqueCode: string;
}

const Devices: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const devices = useSelector((state: any) => state.subscriber?.userDevices);
  const DealerRecord = useSelector((state: any) => state?.subscriber?.DelearCode);

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;

  const getRecords = async () => {
    try {
      setLoading(true);
      const payload: any = {
        search,
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      };

      if (filter) payload.delearCode = filter;
      if (startDate) payload.startDate = new Date(startDate);
      if (endDate) payload.endDate = new Date(endDate);

      const deviceResult = await dispatch(DeviceByOwnerId(payload));
      setTotal(deviceResult?.payload?.data?.totalCount || 0);
const payload1:any={}
      await dispatch(GetDealearRecord(payload1));
    } catch (error) {
      console.error('Failed to fetch records:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced effect for search and filters
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getRecords();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, filter, startDate, endDate, currentPage]);

  const handleRowClick = (payload: any) => {
    dispatch(manageSingleDevices(payload));
    navigate('/Manage-device/view-map');
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1); // Reset page on search
  };

  const handleStatusChange = (e: any) => {
    setFilter(e.value);
    setCurrentPage(1); // Reset page on filter
  };

  const dealearOptions =
    DealerRecord?.map((dealer: Dealer) => ({
      label: dealer.uniqueCode,
      value: dealer._id,
    })) || [];

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      {/* Filters */}
      <SearchAndFilter
        statusOptions={dealearOptions}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        filter={filter}
      />

      {/* Date filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="start-date" className="text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            className="mt-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="end-date" className="text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            className="mt-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-5">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading devices...</div>
        ) : (
          <CommonTable
            columns={DevicesKeys}
            data={devices}
            onRowClick={handleRowClick}
            currentPage={currentPage}
          />
        )}
      </div>

      {/* Pagination */}
      {total && total > itemsPerPage && (
        <Pagination
          totalCount={total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Devices;
