import { useSelector } from 'react-redux';
import {
  GpsDevice,
  AddOns,
  SalesTeam,
  DiscountCopoun,
  ManageInvoive,
  EcommDash
} from '../SideBarSvgIcons';
import NotificationTable from '../../../pages/Ecomm/Notification/Component/NotificationTable';

export const useSalesAppSidebarLink = () => {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);

  if (!loginUser) return []; // Prevent rendering routes if loginUser not yet loaded

  return [
   
   {
      path: '/ecommdashboard',
      label: 'Dashboard',
      icon: <EcommDash />,
      condition: (pathname: string) =>pathname.match('/ecommdashboard'),
      isView:true
    },
    {
      path: '/salesApp/sales-team',
      label: 'Sales Team',
      icon: <SalesTeam />,
      condition: (pathname: string) => pathname.match('/salesApp/sales-team'),
      isView: true,
    },
    {
      path: '/salesApp/Discount-Coupon',
      label: 'Discount Coupon',
      icon: <DiscountCopoun />,
      condition: (pathname: string) => pathname.match('/salesApp/Discount-Coupon'),
      isView:true
    },
       {
      path: '/salesApp/Notification',
      label: 'Send Notification',
      icon: <DiscountCopoun />,
      condition: (pathname: string) => pathname.match('/salesApp/Notification'),
      isView:true
    },
    
    {
   path: '/ecommdashboard/Manage-Invoices',
      label: 'Manage Invoices',
      icon: <ManageInvoive />,
      condition: (pathname: string) => pathname.match('/salesApp/Manage-Invoices'),
      isView:true
    },
  ];
};
