import React, { useEffect, useMemo, useState } from 'react';
import AddOnstable from './Component/SalesTeamTable';
import RelayForm from './Component/RelayForm';
import SalesTeamForm from './Component/SalesTeamForm';
import { useDispatch, useSelector } from 'react-redux';
import TeamPerformance from './Component/TeamPerformance';
import { handlePerformence, setupdatesalesTeam } from '../../../api/ecomm/salesTeam';
import { AppDispatch } from '../../../store/store';
import ApplicationTable from './Component/Application/ApplicationTable';



function SaleseTeam() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState('Team');
  const updateSalesTeam = useSelector((state: any) => state?.slesTeame?.updateSalesTeam);
  const performance = useSelector((state: any) => state?.slesTeame?.performance);
  const data = useSelector((state: any) => state.Auth?.loginUserData);
const tabs = useMemo(() => {
 const baseTabs = [
  { label: 'Team', key: 'Team' }
];


// Conditionally insert 'Onboard' and 'Designation' after 'Team'



if (data?.role == "SuperAdmin" || data?.designation?.designation == "SSM") {
  baseTabs.push(
    { label: 'Onboard', key: 'onboard' },
    { label: 'Designation', key: 'Designation' },
  { label: 'Leave Applications', key: 'LeaveApplications' }

  );
}

// Always push Performance and Leave Applications at the end
baseTabs.push(
  { label: 'Performance', key: 'Performence' },
);


    return baseTabs;
  }, [data]);
  useEffect(() => {
    if (updateSalesTeam) {
      setActiveTab('onboard');
    }else{
      setActiveTab('Team');
    }
  }, [updateSalesTeam]);

  useEffect(() => {
    if (performance) {
      setActiveTab('Performence');
    }
    // return () => {
    //   const reset = async () => {
    //     const payload: any = null;
    //     await dispatch(setupdatesalesTeam(payload));
    //     await dispatch(handlePerformence(payload))
    //   };
    //   reset();
    // };
  }, [performance]);
  useEffect(()=>{
    return()=>{
   const payload: any = null;
      dispatch(handlePerformence(payload));
           const reset = async () => {
        const payload: any = null;
        await dispatch(setupdatesalesTeam(payload));
        await dispatch(handlePerformence(payload))
      };
      reset();
    }
  },[])

  return (
    <div className="pb-20">
      <div className="topnav">
        {tabs.map((tab: { key: string | number | bigint | ((prevState: string) => string) | null | undefined; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === 'Team' && <AddOnstable />}
        {activeTab === 'onboard' && <SalesTeamForm />}
        {activeTab === 'Designation' && <RelayForm />}
        {activeTab === 'Performence' && <TeamPerformance />}
        {activeTab === 'LeaveApplications' && <ApplicationTable />}
      </div>
    </div>
  );
}

export default SaleseTeam;
