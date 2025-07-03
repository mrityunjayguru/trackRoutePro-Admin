import { useSelector } from 'react-redux';
import { MaxDistanceCoveredVehicles } from './dashboardTable/MaxDistanceCoveredVehicles';
import { LatestIgnitionON } from './dashboardTable/LatestIgnitionON';
import { TopDealers } from './dashboardTable/TopDealers';
import { ExpiringSubscriptions } from './dashboardTable/ExpiringSubscriptions';

const DashboardTablesOverview = () => {
  const setOther = useSelector((state: any) => state.dashboard.setOther);
  return (
    <div className="bg-gray-100 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Row: Max Distance and Latest Ignition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MaxDistanceCoveredVehicles distancecovered={setOther?.distanceCovered} />
          <LatestIgnitionON igitionstatus={setOther?.checkIgnitionStatus} />
        </div>

        {/* Bottom Row: Top Dealers and Expiring Subscriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopDealers />
          <ExpiringSubscriptions subscriberExp={setOther?.subscriberExp} />
        </div>
      </div>
    </div>
  );
};

export default DashboardTablesOverview;
