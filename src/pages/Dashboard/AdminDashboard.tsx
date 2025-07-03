import React, { useEffect, useState } from 'react';

import TableOne from '../../components/Tables/TableOne';
import { GroupSubscriber } from '../../api/users';
import { useSelector, useDispatch } from 'react-redux';
import { dashboardoverviewAdmin, GetDashboard, GetOtherDashboard } from '../../api/dashboard';
import { AppDispatch } from '../../store/store';
import Table from '../../components/Tables/Table';
import Loader from '../../layout/Loader';
import DownloadData from './DownloadData';
import DashboardCart from './DashboardCart';
import DashboardOverview from './DashboardOverview';
import DashboardTablesOverview from './DashboardTablesOverview';
import ApprovalAndDevicesDashboard from './ApprovalAndDevicesDashboard';
const ECommerce: React.FC = () => {
  const [subscriberndividual, setSubscriberndividual] = useState([]);
  const [subscriberndCompany, setSubscriberndCompany] = useState([]);
  const [dashboard, setDashboard] = useState<any>({});
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state.subscriber.groupSubscriber);
  const datadashboard = useSelector((state: any) => state.dashboard.dashboard);
  const dashboardoverviews = useSelector((state: any) => state.dashboard.dashboardoverview);
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  useEffect(() => {
    if (datadashboard) {
      setDashboard(datadashboard);
    }
  }, [datadashboard]);

  useEffect(() => {
    const payload: any = {};
    dispatch(GetDashboard(payload));
    dispatch(GetOtherDashboard(payload));
    dispatch(dashboardoverviewAdmin(payload))
  }, []);
  const groupSubscriber = async () => {
    let payload: any = {};
    dispatch(GroupSubscriber(payload));
  };
  useEffect(() => {
    if (data) {
        setSubscriberndividual(data.Individual);
      if (data.Company) {
        setSubscriberndCompany(data.Company);
      }
    }
  }, [data]);
const [toggle,settoggle]=useState(false)
  useEffect(() => {
    settoggle(true)
    groupSubscriber();
    settoggle(false)
  }, []);
  return (
    <>
    {toggle?(<Loader/>):(null)}
    {loginUser?.permissions?.Dashboard?.View || loginUser?.role=="SuperAdmin"?(
   <div className='p-5'>
      {/* <DashboardCart/> */}
      <DashboardOverview data={dashboardoverviews}/>
    <DashboardTablesOverview/>
    {/* <ApprovalAndDevicesDashboard/> */}

   </div>

    ):(null)}
      {loginUser?.permissions?.Manage_User?.View === true || loginUser?.role=="SuperAdmin" ? (
     <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
     <div className="col-span-12 xl:col-span-12 p-5">
       {/* <TableOne type="Company" Subscriber={subscriberndCompany} /> */}
       {/* <Table  data={subscriberndividual}/> */}
       <div className="mt-5">
         {/* <TableOne type="Individual" Subscriber={subscriberndividual} /> */}
       </div>
     </div>
   </div>
      ) : (null)}
     
     <div className="my-10">
     {loginUser?.permissions?.Dashboard?.View || loginUser?.role=="SuperAdmin"?(
      <DownloadData/>


    ):(null)}
     </div>
    </>
  );
};

export default ECommerce;
