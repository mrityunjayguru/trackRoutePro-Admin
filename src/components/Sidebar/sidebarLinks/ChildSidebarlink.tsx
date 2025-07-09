import { useSelector } from 'react-redux';
import {
  GpsDevice,
  AddOns,
  SalesTeam,
  DiscountCopoun,
  ManageInvoive,
  EcommDash
} from '../SideBarSvgIcons';

export const useChildSidebarRoutes = () => {
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
      path: '/ecommdashboard/gps_devices',
      label: 'GPS Devices',
      icon: <GpsDevice />,
      condition: (pathname: string) => pathname.match('/ecommdashboard/gps_devices'),
      isView:loginUser?.role=="SuperAdmin"
    },
    {
      path: '/ecommdashboard/add_ons',
      label: 'Add-ons',
      icon: <AddOns />,
      condition: (pathname: string) => pathname.match('/ecommdashboard/add_ons'),
    isView:loginUser?.role=="SuperAdmin"
    },
    {
      path: '/ecommdashboard/sales-team',
      label: 'Sales Team',
      icon: <SalesTeam />,
      condition: (pathname: string) => pathname.match('/ecommdashboard/sales-team'),
      isView: true,
    },
    {
      path: '/ecommdashboard/Discount-Coupon',
      label: 'Discount Coupon',
      icon: <DiscountCopoun />,
      condition: (pathname: string) => pathname.match('/ecommdashboard/Discount-Coupon'),
      isView:true
    },
    {
      path: '/ecommdashboard/Manage-Invoices',
      label: 'Manage Invoices',
      icon: <ManageInvoive />,
      condition: (pathname: string) => pathname.match('/ecommdashboard/Manage-Invoices'),
      isView:true
    },
  ];
};
