import React, { useState } from "react";
import { Eye, Pencil, Upload } from "lucide-react";

const invoices = [
  {
    invoiceNo: "TRP/INV1",
    salesAssistant: "Esmeralda Peck",
    clientName: "Ian Molina",
    amount: "2,999",
    govtRelated: "No",
  },
  {
    invoiceNo: "TRP/INV2",
    salesAssistant: "Raylan Osborn",
    clientName: "Campbell King",
    amount: "4,999",
    govtRelated: "Yes",
  },
  {
    invoiceNo: "TRP/INV3",
    salesAssistant: "Esmeralda Peck",
    clientName: "Corbin French",
    amount: "17,999",
    govtRelated: "No",
  },
];

const InvoiceTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-normal text-[#585859]">Invoices</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 rounded-md text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="border px-2 py-1 rounded-md text-sm bg-black text-white">
            <option>Last month</option>
            <option>This month</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>

      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead className="text-sm text-[#A6A6A6]">
          <tr>
            <th>Invoice No.</th>
            <th>Sales Assistant</th>
            <th>Client Name</th>
            <th>Invoice Amt.</th>
            <th>Govt Related</th>
            <th>View</th>
            <th>Edit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((inv, index) => (
            <tr key={index} className="bg-white shadow-sm text-sm font-medium text-[#1A1D1F] rounded">
              <td className="">{inv.invoiceNo}</td>
              <td>{inv.salesAssistant}</td>
              <td>{inv.clientName}</td>
              <td>{inv.amount}</td>
              <td>{inv.govtRelated}</td>
              <td>
                <Eye className="w-4 h-4 text-purple-500 cursor-pointer" />
              </td>
              <td>
                <Pencil className="w-4 h-4 text-purple-500 cursor-pointer" />
              </td>
              <td>
                <Upload className="w-4 h-4 text-purple-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
