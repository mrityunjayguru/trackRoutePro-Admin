import { FaEye, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  GetFaQPrioritys,
  singleFaQPriorityLis,
} from '../../../../api/FaQPriorityList';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import CommonTable from '../../../../common/Table/CommonTable';
import { topicTableKeys } from '../../../../Utility/CommonTableKey/FaQTableKey';


const ManageFaq = () => {
  const navigate = useNavigate();
  const [filter, setfilter] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const records = useSelector(
    (state: any) => state.FaQPriority.AllFFaQPriorityt,
  );
console.log(records,"recordsrecordsrecordsrecords")
  const getRecords = async () => {
    try {
      const payload: any = {};
      await dispatch(GetFaQPrioritys(payload)); // Await the async dispatch
    } catch (err) {
      console.error('Failed to fetch records:', err); // Add error logging for easier debugging
    }
  };

  useEffect(() => {
    getRecords();
  }, []); // Dependency array is empty to ensure it runs only once
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  const handleRowClick = (records: any) => {
    // if (loginUser.permissions.FAQTopics?.Update == true) {
    let payload: any = records;
    dispatch(singleFaQPriorityLis(payload));
    navigate('/manage/edit-Topic-List');
    // }
  };

  const fun = (e: any) => {
    const payload: any = {
      search: e.target.value,
    };
    dispatch(GetFaQPrioritys(payload));
  };

  const betterfunction = (fun: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout | null;
    return function (...args: any[]) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fun(...args);
      }, delay);
    };
  };

  const debouncedSearch = betterfunction(fun, 1000);
  useEffect(() => {
    const payload: any = {};
    if (filter) Object.assign(payload, { status: filter });
    dispatch(GetFaQPrioritys(payload)); // Await the async dispatch
  }, [filter]);
  const handleStatusChange = (e: any) => {
    setfilter(e.value);
  };
  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  let currentPage = 1;

  return (
    <>
      <div className="searchitem grid grid-cols-3 gap-4 my-2 py-1">
        <div className="col-span-2 relative w-full">
          <input
            onChange={debouncedSearch}
            className="px-10 border border-gray-300 w-full py-2 rounded-2xl focus:border-gray-300 focus:outline-none"
            placeholder="Search"
            type="text"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="col-span-1 text-center">
          <Select
            options={statusOptions}
            placeholder="Select Filter"
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
      <div className="rounded-sm xl:pb-1">
        <CommonTable
          columns={topicTableKeys}
          data={records}
          onRowClick={handleRowClick} // Optional: Add row click behavior
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default ManageFaq;
