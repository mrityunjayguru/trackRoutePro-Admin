import { useNavigate } from 'react-router-dom';
import { FaEye, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { singleSubscribers, Getsubscribers } from '../../../../api/users';
import { AppDispatch } from '../../../../store/store';
import Pagination from '../../../../common/Loader/Pagination';
import { useRef } from 'react';
import { setSearchType } from '../../../../store/subscriber';
import Select from 'react-select';
import CommonTable from '../../../../common/Table/CommonTable';
import { DelearTableKeys } from '../../../Delear/Component/Delear/DelearTableKeys';
import { usertableKeys } from './userTableKey';

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

  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

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
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
    { value: 'Dealer', label: 'Dealers' },
  ];
  return (
    <>
      <div className="searchitem grid grid-cols-3 gap-4 my-2 py-1">
        <div className="col-span-2 relative w-full">
          <input
            className="px-10 border border-gray-300 w-full py-2 rounded-2xl focus:border-gray-300 focus:outline-none"
            placeholder="Search"
            type="text"
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="col-span-1 text-center">
          <Select
            options={statusOptions}
            placeholder="Filter by Account Type"
            isSearchable={false}
            onChange={handleStatusChange}
            value={statusOptions.find((option) => option.value === filter)} // Set the current value
            styles={{
              control: (provided: any) => ({
                ...provided,
                minHeight: '38px',
                backgroundColor: '#000', // Set background color to black
                borderRadius: '9999px', // Fully rounded border (pill shape)
                border: 'none', // Remove any default borders
                paddingTop: '2px',
                paddingBottom: '2px',
                display: 'flex',
                justifyContent: 'center', // Centers content horizontally
                alignItems: 'center', // Centers content vertically
              }),
              placeholder: (provided: any) => ({
                ...provided,
                // Set placeholder color to #D9E821
                textAlign: 'center', // Center the placeholder text
              }),
              option: (provided: any, state: { isSelected: any }) => ({
                ...provided,
                color: '#000', // Set option text color to black

                textAlign: 'center', // Center the option text
              }),
              singleValue: (provided: any) => ({
                ...provided,
                color: '#D9E821', // Set the color of the selected value
                textAlign: 'center', // Center the selected value
              }),
            }}
          />
        </div>
      </div>

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
