import React, { useEffect, useState } from "react";
import { Eye, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { getInvoices } from "../../../../api/ecomm/relaySecurity";
import InvoiceCard from "./InvoiceCard";
import Pagination from "../../../../common/Loader/Pagination";
import { UploadIcons, ViewIcons } from "../../../../components/Sidebar/SideBarSvgIcons";
import InvoiceDatePicker from "../../Sales-Team/Component/Perforemance/InvoiceDatePicker";
import { IoReloadOutline } from "react-icons/io5";
import { formatDateToYMDHM } from "../../../../common/ManageDate";
const InvoiceTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoice, setInvoiceData] = useState<any>(null);
 const [selectedDate, setSelectedDate] = useState<any>(null);

  const dispatch = useDispatch<AppDispatch>();
  const invoicedata = useSelector((state: any) => state.relaySecurity.invoices);
  const total: number = invoicedata?.totalCount || 0;
  const itemsPerPage = 10;

  const getAllInvoices = async () => {
    try {
      const payload: any = {
        search: searchTerm,
        offset: (currentPage - 1) * itemsPerPage,
        endDate:selectedDate?.endDate,
        startDate:selectedDate?.startDate,
      };
      await dispatch(getInvoices(payload));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllInvoices();
  }, []);

  useEffect(() => {
    getAllInvoices();
  }, [searchTerm, currentPage,selectedDate]);

  const handleClick = (val: any) => {
    setInvoiceData(val);
  };

  const handleReload = async() => {
    setSearchTerm("")
    setCurrentPage(1)
    setSelectedDate(null)
    setInvoiceData(null)
   await getAllInvoices();
     
    // Logic to reload data or refresh the dashboard
    console.log("Reloading invoices...");
    // You would typically dispatch an action here to refetch data
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    console.log('Date from child:', date);
  };
  return (
    <div className="p-4">
      {/* Header */}
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        {/* Date Picker and Search Input */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          <InvoiceDatePicker value={selectedDate} onDateChange={handleDateChange} />
          <input
            type="text"
            placeholder="Search by client name..."
            className="border border-gray-300 px-4 py-4 rounded-lg text-sm text-gray-700 w-full sm:w-64 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search by client name"
          />
        </div>

        {/* Reload Button and Title */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-end md:justify-start">
          <button
            onClick={handleReload}
            className="p-3 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center flex-shrink-0"
            aria-label="Reload invoices"
          >
            {/* Replaced IoReloadOutline with inline SVG for compilation */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.922a2.25 2.25 0 0 1 2.244 2.244v2.071M16.023 9.348A14.945 14.945 0 0 1 12 10.5a14.945 14.945 0 0 1-4.023-1.152M16.023 9.348H9.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">Invoices</h2>
        </div>
      </div>
    </div>

      {/* Table and InvoiceCard */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className={`w-full ${invoice ? "lg:w-[70%]" : ""} overflow-x-auto`}>
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead className="text-sm text-[#A6A6A6]">
              <tr>
                <th className="px-3 py-2">Invoice No.</th>
                <th className="px-3 py-2">Sales Assistant</th>
                <th className="px-3 py-2">Client Name</th>
                <th className="px-3 py-2">Invoice Amt.</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">View</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoicedata?.date?.map((inv: any, index: number) => (
                <tr
                  key={index}
                  className="bg-white shadow-sm text-sm font-medium text-[#1A1D1F] rounded cursor-pointer"
                  onClick={() => handleClick(inv)}
                >
                  <td className="px-3 py-2">{inv.invoiceNo}</td>
                  <td className="px-3 py-2">{inv.salesTeam?.fullName}</td>
                  <td className="px-3 py-2">{inv.personalinfo?.fullName}</td>
                  <td className="px-3 py-2">₹ {inv.totalAmount}</td>
                  <td className="px-3 py-2">
                  {formatDateToYMDHM(inv?.orderedAt)}
                  </td>
                  <td className="px-3 py-2">
                    <ViewIcons />
                  </td>
                  <td className="px-3 py-2">
                    <UploadIcons  />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* InvoiceCard */}
        {invoice && (
          <div className="w-full lg:w-[30%]">
            <InvoiceCard invoice={invoice} />
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          totalCount={total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default InvoiceTable;
