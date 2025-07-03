import React from 'react';

const DashboardOverview = ({ data }: { data: any }) => {
  if (!data) return null;
interface StatusCount {
  status: string;
  count: number;
}

interface TotalActiveInactiveItem {
  deviceType: string;
  counts: StatusCount[];
}

interface FormattedDataItem {
  deviceType: string;
  active: number;
  inactive: number;
}

const formattedData: FormattedDataItem[] | undefined = data?.totalActiveInactive?.map((item: TotalActiveInactiveItem): FormattedDataItem => {
  const active = item.counts.find((c: StatusCount) => c.status === "Active")?.count || 0;
  const inactive = item.counts.find((c: StatusCount) => c.status === "inActive")?.count || 0;
  return {
    deviceType: item.deviceType,
    active,
    inactive,
  };
});

  return (
    <div className="p-4 space-y-8">

      {/* Total Inventory */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Total Inventory: <span className="font-bold">{data.totalImei}</span></h2>
        <div className="grid bg-[#F7F7F7] grid-cols-1 md:grid-cols-4 gap-4">
          {data.deviceTypeCount?.map((device: any, index: number) => (
            <div key={index} className=" rounded  p-4">
              <h3 className="font-semibold">{device.deviceType}</h3>
              <p> <span className="font-bold text-[#6C63FF]">{device.count}</span></p>

              {/* Assigned/Unassigned per deviceType */}
              {data.totalAssignedAndUnassignedByName?.filter((d: any) => d.deviceType === device.deviceType).map((item: any, i: number) => (
                <div key={i} className="mt-2 text-sm text-[#000000]">
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
        <h2 className="text-lg font-semibold mb-2">Total Subscribers: <span className="font-bold text-[#6C63FF]">{data.userCounts?.[0]?.totalUsers?.[0]?.count || 0}</span></h2>
      <div className="grid bg-[#F7F7F7] grid-cols-1 md:grid-cols-4 gap-4">
  {formattedData?.map((type: { deviceType: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; active: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; inactive: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
    <div key={index} className="p-4">
      <h3 className="font-semibold text-lg mb-2">{type.deviceType}</h3>
      <p className="text-green-600">Active: {type.active}</p>
      <p className="text-red-600">Inactive: {type.inactive}</p>
    </div>
  ))}
</div>

      </div>

      {/* Sales Projections */}
      <div className="grid bg-[#F7F7F7] grid-cols-1 md:grid-cols-3 gap-4">
     <div className=" p-4">
  <h3 className="font-semibold mb-2">Subscribers Added This Month</h3>
  <p className='text-[#6C63FF]'>Total: {data.subscriberAddedThisMonth?.[0]?.totalUsers || 0}</p>

  {data.devicesOfThisMonth?.map((item: any, index: number) => (
    <p key={index}>
      {item.isWired ? "Wired" : "Wireless"}: {item.count}
    </p>
  ))}
</div>


     <div className=" rounded  p-4">
  <h3 className="font-semibold mb-2">Subscribers Added Last Quarter</h3>
  <p className='text-[#6C63FF]'>Total: {data.subscriberAddedLastQuarter?.[0]?.totalUsers || 0}</p>
  
  {data.devicesOfLastQuarter?.[0]?.countsByIsWired?.map((item: any, index: number) => (
    <p className='text-[#000000]' key={index}>
      {item.isWired ? "Wired" : "Wireless"}: {item.count}
    </p>
  ))}
  
</div>
 <div className=" rounded  p-4">
        <h3 className="font-semibold mb-2">Roles</h3>
        <p className=''>Admin: <span className='text-[#6C63FF]'>{data.adminRoleCount?.[0]?.totalUsers || 0}</span></p>
        <p className=''>Dealers: <span className='text-[#6C63FF]'>{data.delearcount?.[0]?.totalDealer || 0}</span></p>
      </div>
      </div>

      {/* Roles */}
     

      {/* Device Installation (Vehicle Wise) */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Device Installation <span className="text-sm text-gray-500">(Vehicle Wise)</span></h2>
        <div className="grid bg-[#F7F7F7] grid-cols-2 md:grid-cols-8 lg:grid-cols-8 gap-4">
          {data.vehicleTypeCount?.map((vehicle: any, index: number) => (
            <div key={index} className=" p-4 text-center">
              <h3 className="font-semibold">{vehicle.vehicleTypeName}</h3>
              <p className="text-2xl font-bold  text-[#6C63FF]">{vehicle.count}</p>
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
