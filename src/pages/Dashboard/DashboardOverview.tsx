import React from 'react';

const DashboardOverview = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div className="p-4 space-y-8">

      {/* Total Inventory */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Total Inventory: <span className="font-bold">{data.totalImei}</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.deviceTypeCount?.map((device: any, index: number) => (
            <div key={index} className="bg-white rounded shadow p-4">
              <h3 className="font-semibold">{device.deviceType}</h3>
              <p>Count: <span className="font-bold">{device.count}</span></p>

              {/* Assigned/Unassigned per deviceType */}
              {data.totalAssignedAndUnassignedByName?.filter((d: any) => d.deviceType === device.deviceType).map((item: any, i: number) => (
                <div key={i} className="mt-2 text-sm">
                  {item.counts.map((c: any, j: number) => (
                    <p key={j}>{c.status}: {c.count}</p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Total Subscribers */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Total Subscribers: <span className="font-bold">{data.userCounts?.[0]?.totalUsers?.[0]?.count || 0}</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Sentinel", "MagTrack"].map((type, index) => (
            <div key={index} className="bg-white rounded shadow p-4">
              <h3 className="font-semibold">{type}</h3>
              <p>Active: 50</p> {/* Replace with actual active counts if available */}
              <p>Inactive: 5</p> {/* Replace with actual inactive counts if available */}
            </div>
          ))}
        </div>
      </div>

      {/* Sales Projections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Subscribers Added This Month</h3>
          <p>Total: {data.subscriberAddedThisMonth?.[0]?.totalUsers || 0}</p>
          {data.devicesOfThisMonth?.[0]?.countsByIsWired?.map((item: any, index: number) => (
            <p key={index}>{item.isWired ? "Wired" : "Wireless"}: {item.count}</p>
          ))}
        </div>

        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">Subscribers Added Last Quarter</h3>
          <p>Total: {data.subscriberAddedLastQuarter?.[0]?.totalUsers || 0}</p>
          {data.devicesOfLastQuarter?.[0]?.countsByIsWired?.map((item: any, index: number) => (
            <p key={index}>{item.isWired ? "Wired" : "Wireless"}: {item.count}</p>
          ))}
        </div>
      </div>

      {/* Roles */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Roles</h3>
        <p>Admin: {data.adminRoleCount?.[0]?.totalUsers || 0}</p>
        <p>Dealers: {data.delearcount?.[0]?.totalDealer || 0}</p>
        <p>Modes: 2</p> {/* Replace with actual modes count if available */}
      </div>

      {/* Device Installation (Vehicle Wise) */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Device Installation <span className="text-sm text-gray-500">(Vehicle Wise)</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.vehicleTypeCount?.map((vehicle: any, index: number) => (
            <div key={index} className="bg-white rounded shadow p-4 text-center">
              <h3 className="font-semibold">{vehicle.vehicleTypeName}</h3>
              <p className="text-2xl font-bold">{vehicle.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* View More */}
      <div className="text-right">
        <button className="text-blue-600 font-semibold">View More</button>
      </div>

    </div>
  );
};

export default DashboardOverview;
