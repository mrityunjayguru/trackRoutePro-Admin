import { useNavigate } from 'react-router-dom';
import { AllAdmin, singleAdmin } from '../../../api/Admin';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import { AppDispatch } from '../../../store/store';
import { useEffect, useState } from 'react';
import Pagination from '../../../common/Loader/Pagination';
import CommonTable from '../../../common/Table/CommonTable';
import { AdminTableKey } from '../../../Utility/CommonTableKey/AdminTableKey';
import SearchAndFilter from '../../../common/SearchAndFilter';

function AdminRoleTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const AdminData = useSelector((state: any) => state.adminRole.Admin?.records);
  const total = useSelector((state: any) => state.adminRole.Admin?.totalcount);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const handleRowClick = (user: any) => {
    dispatch(singleAdmin(user));
    navigate('/Admin-Roles/Edit-Admin-Roles');
  };

  const getAdmin = async () => {
    let payload: any = {
      search: search || undefined, // Send search value only if it exists
      filter: filter || undefined, // Send filter value only if it exists
      offset: (currentPage - 1) * itemsPerPage,
    };
    dispatch(AllAdmin(payload));
  };

  useEffect(() => {
    getAdmin();
  }, [currentPage, filter, search]); // Trigger getAdmin whenever currentPage, filter, or search change

  const handleSearchChange = (val: string) => {
    setSearch(val);
  };

  const handleStatusChange = (e: any) => {
    setFilter(e.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' }
  ];

  return (
    <>
      <SearchAndFilter
        statusOptions={statusOptions}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        filter={filter}
      />
      <CommonTable
        columns={AdminTableKey}
        data={AdminData}
        onRowClick={handleRowClick}
        currentPage={currentPage}
      />
      <Pagination
        totalCount={total}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default AdminRoleTable;
