import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { singleSubscribers, Getsubscribers } from '../../../../api/users';
import { AppDispatch } from '../../../../store/store';
import Pagination from '../../../../common/Loader/Pagination';
import { useRef } from 'react';
import { setSearchType } from '../../../../store/subscriber';
import CommonTable from '../../../../common/Table/CommonTable';
import { usertableKeys } from './userTableKey';
import SearchAndFilter from '../../../../common/SearchAndFilter';

// Define the shape of a subscriber object
interface Subscriber {
  _id: string;
  Name: string;
  emailAddress: string;
  phone: string;
  city: string;
  subscribeType: string;
  userDevices: [];
  createdAt: string;
  id: string;
  userDevicesCount: String;
  device: string; // Assuming device is a string representing the device type
}

// Define the state structure for your Redux store

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [subscriber, setSubscriber] = useState<Subscriber[]>([]);
  const [filter, setfilter] = useState();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this value as needed
  const data = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.records,
  );
  // console.log(data,"datadatadata")
  const total: any = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.totalCount,
  );
  const filterType: any = useSelector(
    (state: any) => state.subscriber?.subscribeType,
  );
  useEffect(() => {
    setfilter(filterType);
  }, [filterType]);

 useSelector((state: any) => state.Auth?.loginUserData);

  useEffect(() => {
    if (data) {
      setSubscriber(data);
    }
  }, [data]);

  const handleRowClick = (user: Subscriber) => {
    navigate(
      `/account-management/manage-subscriber/view-subscriber/${user._id}`,
    );
    const payload: any = user;
    dispatch(singleSubscribers(payload));
  };
  const GetsubscribersAll = () => {
    const payload: any = {
      search,
      role: 'User',
      offset: (currentPage - 1) * itemsPerPage,
    };
    if (filter) Object.assign(payload, { filter: filter });
    dispatch(Getsubscribers(payload));
  };

  // Debounce function
  const useDebounce = (func: (...args: any[]) => void, delay: number) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    return (...args: any[]) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedFetch = useDebounce(GetsubscribersAll, 1000);
  const handleSearchChange = (val: any) => {
    setSearch(val);
  };
  // Effect to fetch subscribers when search term or current page changes
  useEffect(() => {
    debouncedFetch();
  }, [search, currentPage, filter]);
  const handleStatusChange = (e: any) => {
    dispatch(setSearchType(''));
    setfilter(e.value);
  };
  const isMounted = useRef(false);
  useEffect(() => {
    return () => {
      if (isMounted.current) {
      }
    };
  }, []);
  useEffect(() => {
    // Set to true after the first render
    isMounted.current = true;
  }, []);
  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Company', label: 'Company' },
    { value: 'Individual', label: 'Individuals' },
  ];
  return (
    <>
      <SearchAndFilter
        statusOptions={statusOptions}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        filter={filter}
      />
      <div className=" overflow-y-auto rounded-sm  xl:pb-1">
        <CommonTable
          columns={usertableKeys}
          data={subscriber}
          onRowClick={handleRowClick} // Optional: Add row click behavior
          currentPage={currentPage}
        />

        <Pagination
          totalCount={total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default UserTable;
