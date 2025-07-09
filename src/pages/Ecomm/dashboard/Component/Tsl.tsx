import React from "react";
import { useSelector } from "react-redux";

const TSLSalesHierarchyTable = ({ data }) => {
  const userData = useSelector((state: any) => state.Auth?.loginUserData);

  if (!data) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Sales Hierarchy (TL & SRO)</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="border p-2">Role</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            {userData?.role === "SuperAdmin" && (
              <th className="border p-2">Total Revenue</th>
            )}
            <th className="border p-2">Items Sold</th>
          </tr>
        </thead>
        <tbody>
          {/* TL Row */}
          <tr className="bg-green-50 font-medium">
            <td className="border p-2">TL</td>
            <td className="border p-2">{data.fullName}</td>
            <td className="border p-2">{data.email}</td>
            <td className="border p-2">{data.phone}</td>
            {userData?.role === "SuperAdmin" && (
              <td className="border p-2">₹ {data.totalRevenue}</td>
            )}
            <td className="border p-2">{data.totalItemsSold}</td>
          </tr>

          {/* SRO Rows */}
          {data.sros?.map((sro: any) => (
            <tr key={sro._id} className="bg-yellow-50">
              <td className="border p-2 pl-6">SRO</td>
              <td className="border p-2">{sro.fullName}</td>
              <td className="border p-2">{sro.email}</td>
              <td className="border p-2">{sro.phone}</td>
              {userData?.role === "SuperAdmin" && (
                <td className="border p-2">₹ {sro.totalRevenue}</td>
              )}
              <td className="border p-2">{sro.totalItemsSold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TSLSalesHierarchyTable;
