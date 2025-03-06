import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { SingleRecords, UsersReportData } from '../../../api/Reports';
import CommonTable from '../../../common/Table/CommonTable';
import { usertableKeys } from '../../ManageUsers/Component/Subscriber/userTableKey';
import { UserReportKey } from './UserReportKey';
import SearchAndFilter from '../../../common/SearchAndFilter';
import Mappopup from './Mappopup';

function Root() {
  const [search, setSearch] = useState('');

  const datass = useSelector((state: any) => state?.userReport?.UserReportData);

  const [currentPage, setCurrentPage] = useState(1);
  const [open,setOpen]=useState<any>(false)

  const dispatch = useDispatch<AppDispatch>();
  const getUserReports = async () => {
    const payload: any = {
      search:search,
    };
    dispatch(UsersReportData(payload));
  };
  useEffect(() => {
    getUserReports();
  }, [search]);

  const handleonclose = () => {
    setOpen(false)
  };
  const handleRowClick = async(val:any) => {
    await dispatch(SingleRecords(val))
    setOpen(true)
  };
  const handleSearchChange = (e:any) => {
    setSearch(e);
  };
    const handleStatusChange = (e: any) => {
 
    };
  const [filter, setfilter] = useState();
  const statusOptions:any = [

  ];
  return (
    <div>
   <div className='z-99999'>
   {open?(
    <Mappopup text="Route History" showheader={true} onClose={handleonclose} records={undefined}  />
      ):(null)}
   </div>
          <SearchAndFilter
        statusOptions={statusOptions}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        filter={filter}
      />
      <CommonTable
        columns={UserReportKey}
        data={datass}
        onRowClick={handleRowClick} // Optional: Add row click behavior
        currentPage={currentPage}
      />
    </div>
  );
}

export default Root;


