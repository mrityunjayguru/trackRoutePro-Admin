import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { DeviceDetailTableKeys } from "./DeveiceDetailTableKeys";
import { useNavigate } from "react-router-dom";
import { getDeviceDetail, singleDeviceDetails } from "../../api/DeviceDetails";
import SearchAndFilter from "../../common/SearchAndFilter";
import CommonTable from "../../common/Table/CommonTable";
import { DeveiceDetailTableKeys } from "../../pages/Manage/DeviceDetail/Component/DeveiceDetailTableKeys";
import Pagination from "../../common/Loader/Pagination";
import { AppDispatch } from "../../store/store";
import { SimManagmentkeys } from "./Component/SimManagmentkeys";


function SimManagment() {
  const navigate = useNavigate();
  const deviceDetail = useSelector((state: any) => state?.deviceDetail?.deviceDetail);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const itemsPerPage = 10;
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);

const [total,setTotal]=useState<any>(0)
  const handleRowClick = async (data: any) => {
    await dispatch(singleDeviceDetails(data));
    navigate("/sim-managment/edit");
  };

  const getRecord =async () => {
    const payload: any = {
      search: searchQuery,
      status: filter,
      offset: (currentPage - 1) * itemsPerPage
    };
    let responce=await dispatch(getDeviceDetail(payload));
    setTotal(responce.payload.data.totalCount)
  };

  useEffect(() => {
    getRecord(); // Call getRecord whenever searchQuery, filter, or currentPage changes
  }, [searchQuery, filter, currentPage,currentPage]);

  const statusOptions = [
    { value: "", label: "All" },
    { value: "Assigned", label: "Assigned" },
    { value: "Unassigned", label: "Unassigned" }
  ];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value); // Update the search query
  };

  const handleStatusChange = (selectedOption: any) => {
    setFilter(selectedOption.value); // Update the selected filter
  };

  return (
    <>
      <div className=" overflow-y-auto rounded-sm  xl:pb-1">
        <div>
          <SearchAndFilter
            statusOptions={statusOptions} // Pass the options here
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            filter={filter}
          />
        </div>
        <div className="mt-5">
          <CommonTable
            columns={SimManagmentkeys}
            data={deviceDetail}
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
}

export default SimManagment;
