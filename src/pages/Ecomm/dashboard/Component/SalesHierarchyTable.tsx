import React from "react";
import { useSelector } from "react-redux";

const SalesHierarchyTable = ({ data }) => {
  const userData = useSelector((state: any) => state.Auth?.loginUserData);
console.log(data,"datadata")
  if (data && data.length==0 ) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Sales Hierarchy</h2>
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
          {data && data.length>0 && data?.map((ssm: any) => (
            <React.Fragment key={ssm._id}>
              {/* SSM Row */}
              <tr className="bg-blue-50 font-medium">
                <td className="border p-2">SSM</td>
                <td className="border p-2">{ssm.fullName}</td>
                <td className="border p-2">{ssm.email}</td>
                <td className="border p-2">{ssm.phone}</td>
                {userData?.role === "SuperAdmin" && (
                  <td className="border p-2">₹ {ssm.totalRevenue}</td>
                )}
                <td className="border p-2">{ssm.totalItemsSold}</td>
              </tr>

              {/* TL Rows */}
              {ssm.tls?.map((tl: any) => (
                <React.Fragment key={tl._id}>
                  <tr className="bg-green-50">
                    <td className="border p-2 pl-6">TL</td>
                    <td className="border p-2">{tl.fullName}</td>
                    <td className="border p-2">{tl.email}</td>
                    <td className="border p-2">{tl.phone}</td>
                    {userData?.role === "SuperAdmin" && (
                      <td className="border p-2">₹ {tl.totalRevenue}</td>
                    )}
                    <td className="border p-2">{tl.totalItemsSold}</td>
                  </tr>

                  {/* SRO Rows */}
                  {tl.sros?.map((sro: any) => (
                    <tr key={sro._id} className="bg-yellow-50">
                      <td className="border p-2 pl-12">SRO</td>
                      <td className="border p-2">{sro.fullName}</td>
                      <td className="border p-2">{sro.email}</td>
                      <td className="border p-2">{sro.phone}</td>
                      {userData?.role === "SuperAdmin" && (
                        <td className="border p-2">₹ {sro.totalRevenue}</td>
                      )}
                      <td className="border p-2">{sro.totalItemsSold}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHierarchyTable;
