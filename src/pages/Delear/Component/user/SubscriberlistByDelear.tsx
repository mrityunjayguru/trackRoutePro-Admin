import { useNavigate } from 'react-router-dom';
import { FaEye, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { singleSubscribers, Getsubscribers, delearSubscribers, getSubscriberRecordAddEdByDelear } from '../../../../api/users';
import { AppDispatch } from '../../../../store/store';
import Pagination from '../../../../common/Loader/Pagination';
import { useRef } from 'react';
import { setSearchType } from '../../../../store/subscriber';
import { DelearTableKeys } from '../Delear/DelearTableKeys';
import CommonTable from '../../../../common/Table/CommonTable';
import SearchAndFilter from '../../../../common/SearchAndFilter';
import { UserTableKeys } from './UsereTableKey';
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
  device: string; // Assuming device is a string representing the device type
}

// Define the state structure for your Redux store

const SubscriberlistByDelear: React.FC = () => {
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

  const singleDelear = useSelector(
    (state: any) => state.subscriber.singleDelearUser,
  );
  useEffect(() => {
    setfilter(filterType);
  }, [filterType]);

  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  useEffect(() => {
    if (data) {
      setSubscriber(data);
    }
  }, [data]);

  const handleRowClick = async (user: any) => {
    await dispatch(singleSubscribers(user));
    navigate(`/ViewUserBydelear`);
  }; 

  const GetsubscribersAll = () => {
    const payload: any = {
      search,
      createdDelearId: singleDelear._id,
      offset: (currentPage - 1) * itemsPerPage,
      role: 'User',
    };
    if (filter) Object.assign(payload, { filter: filter });
        dispatch(getSubscriberRecordAddEdByDelear(payload));
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
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    debouncedFetch();
  }, [search, currentPage, filter]);
  const handleStatusChange = (e: any) => {
    dispatch(setSearchType(''));
    setfilter(e.value);
  };
  const isMounted = useRef(false);
  useEffect(() => {
    console.log('Component mounted');

    return () => {
      if (isMounted.current) {
        console.log('Component unmounted');
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
    { value: 'Individual', label: 'Individuals' }
  ];
  //   const handleRowClick=(val:any)=>{

  //   }
  return (
    <>
      <SearchAndFilter
        statusOptions={statusOptions} // Pass the options here
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        filter={filter}
      />
      <div className=" overflow-y-auto rounded-sm  xl:pb-1">
        <div className="mt-5">
          <CommonTable
            columns={UserTableKeys}
            data={subscriber}
            onRowClick={handleRowClick} // Optional: Add row click behavior
            currentPage={currentPage}
          />
        </div>
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

export default SubscriberlistByDelear;
