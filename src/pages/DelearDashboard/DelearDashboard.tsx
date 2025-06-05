import { useEffect, useState } from 'react';
import CommonHeader from '../../common/CommonHeader';
// import SubscriberTable from './Component/Subscriber/subscriberTable';
import { delearSubscribers, Getsubscribers } from '../../api/users';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import Pagination from '../../common/Loader/Pagination';
import SubscriberTable from './Component/Subscriber/SubscriberTable';
import SearchAndFilter from '../../common/SearchAndFilter';
const DelearDashboard = () => {
  const total: any = useSelector(
    (state: any) => state.subscriber.AllSubscriber?.totalCount,
  );
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  const dispatch=useDispatch<AppDispatch>()
  const propsData = {
    title: 'List of All Subscribers',
    button: 'Add New +',
    redirect: 'existignuser',

  };
  const itemsPerPage = 10; // Adjust this value as needed
 
   const [filter, setfilter] = useState();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
  const GetsubscribersAll = () => {
    const payload: any = {
      search,
      role:"User",
      createdDelearId:loginUser._id,
      offset: (currentPage - 1) * itemsPerPage,
    };
    if(search)Object.assign(payload,{search:search})
    if (filter) Object.assign(payload, { status: filter=="Active"?true:false });
    dispatch(delearSubscribers(payload));
  };
useEffect(()=>{
  GetsubscribersAll()
},[])
useEffect(()=>{
  GetsubscribersAll()
},[search,filter])
const statusOptions = [
  { value: '', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'InActive', label: 'InActive' },
];
const handleSearchChange = (e:any) => {
  setSearch(e);
};
 const handleStatusChange = (e: any) => {
  console.log(e,"kkkkkkkkkk")
    setfilter(e.value);
  };
  return (
    <>
    <div className='p-5'>
        <CommonHeader propsData={propsData} />
      <SearchAndFilter
        statusOptions={statusOptions} 
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        filter={filter}
      />
      <SubscriberTable />
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

export default DelearDashboard;
