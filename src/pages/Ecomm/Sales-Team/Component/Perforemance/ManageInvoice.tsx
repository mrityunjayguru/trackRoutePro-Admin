import React, { useEffect, useState } from "react";
import { Eye, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { UploadIcons, ViewIcons } from "../../../../../components/Sidebar/SideBarSvgIcons";
import InvoiceCard from "../../../Manage-Invoice/Component/InvoiceCard";
import Pagination from "../../../../../common/Loader/Pagination";
import { getInvoices } from "../../../../../api/ecomm/relaySecurity";
import InvoiceDatePicker from "./InvoiceDatePicker";

const ManageInvoice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoice, setInvoiceData] = useState<any>(null);
  const performance = useSelector((state:any) => state?.slesTeame?.performance);

  const dispatch = useDispatch<AppDispatch>();
  const invoicedata = useSelector((state: any) => state.relaySecurity.invoices);
  const total: number = invoicedata?.totalCount || 0;
  const itemsPerPage = 10;

  const getAllInvoices = async () => {
    try {
      const payload: any = {
        search: searchTerm,
        offset: (currentPage - 1) * itemsPerPage,
      };
      if(performance._id){
        Object.assign(payload,{userId:performance._id})
      }
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
  }, [searchTerm, currentPage]);

  const handleClick = (val: any) => {
    setInvoiceData(val);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
         <InvoiceDatePicker/>
        </div>
        <h2 className="text-lg font-semibold text-[#a8a8b1]">Invoices</h2>
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
                <th className="px-3 py-2">Govt Related</th>
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
                    {inv.item?.productInfo?.govtRelated ? "Yes" : "No"}
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

export default ManageInvoice;
