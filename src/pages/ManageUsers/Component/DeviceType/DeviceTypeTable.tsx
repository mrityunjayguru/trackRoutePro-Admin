import React, { useEffect, useState } from 'react';
import CommonHeader from '../../../../common/CommonHeader';
import { getDeviceType, singleDeviceType } from '../../../../api/DeviceType';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { FaEye } from 'react-icons/fa';
import Pagination from '../../../../common/Loader/Pagination'; // Assuming you have a Pagination component
import { useNavigate } from 'react-router-dom';
import SearchAndFilter from '../../../../common/SearchAndFilter';
import CommonTable from '../../../../common/Table/CommonTable';
import { DeviceTypeTableKey } from '../../../../Utility/CommonTableKey/DeviceTypeTableKey';
import { deviceTypes, dowonloadUser } from '../../../../api/DownloadDetail';
const DeviceTypeTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  // Define status options
  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];
  const devicetypeDetails = useSelector(
    (state: any) => state?.DeviceTye.deviceType,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const [total, setTotal] = useState(0); // Assuming you have total count info

  // Fetching device types
  const getDeviceTypes = async () => {
    try {
      const payload: any = {
        offset: (currentPage - 1) * itemsPerPage,
      };
      Object.assign(payload, { search: searchQuery });
      Object.assign(payload, { status: filter });

      const response: any = await dispatch(getDeviceType(payload));
      setTotal(response?.totalCount); // Set the total count for pagination
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDeviceTypes();
  }, [currentPage, searchQuery, filter]);

  const propsData = {
    title: 'List Of All Device Type',
    button: 'Add New',
    redirect: 'deviceType',
    button3: "Download deviceType's",
  };
  const handleRowClick = (val: any) => {
    dispatch(singleDeviceType(val));
    navigate('/EditDeviceType');
  };
  const handleSearchChange = (value: string) => {
    setSearchQuery(value); // Update the search query
  };

  // Handle status change
  const handleStatusChange = (selectedOption: any) => {
    setFilter(selectedOption.value); // Update the selected filter
  };
  const handledownload = async () => {
    try {
      const payload: any = {};
      let response = await dispatch(deviceTypes(payload));
      // Ensure we have a valid file URL
      if (response.payload?.data?.data) {
        const fileUrl = `${import.meta.env.VITE_APP_Image_Url}${
          response.payload.data.data
        }`; // Construct full URL
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = response.payload.data.data.split('/').pop(); // Extract file name from URL
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error('Download failed: No file URL received');
      }
    } catch (error) {
      console.error('Error while downloading:', error);
    }
  };
  return (
    <>
      <CommonHeader propsData={propsData} handledownload={handledownload} />
      <SearchAndFilter
        statusOptions={statusOptions} // Pass the options here
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        filter={filter}
      />
      <div className="overflow-y-auto rounded-sm xl:pb-1 my-5">
        <CommonTable
          columns={DeviceTypeTableKey}
          data={devicetypeDetails}
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

export default DeviceTypeTable;
