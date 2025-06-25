import { useSelector } from 'react-redux';
import {
  AddVehicleIcon,
  ApplicationSetting,
  DeviceManager,
  ManageDeviceIcons,
  ManageIcons,
  ManageinventryIcon,
  ManageSubscriberIcos,
  ManageSubscribersIcon,
  ManageType,
  ManageUserIcos,
  MapOverViewIcons,
  NotificationsIcons,
  ReportsIcons,
  RouteHistoryIcons,
  SuportIcons,
} from './SideBarSvgIcons';
export const useSidebarRoutes = () => {
  const loginUser = useSelector((state: any) => state.Auth?.loginUserData);
  return [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <ManageSubscribersIcon />,
      condition: (pathname: string) => pathname === '/dashboard',
      isView:
        loginUser.role === 'SuperAdmin' || loginUser.role === 'Admin'
          ? true
          : false, // Added the isView property
    },
    {
      path: '/DealearDashboard',
      label: 'DealerDashboard',
      icon: <ManageSubscribersIcon />,
      condition: (pathname: string) => pathname === '/DealearDashboard',
      isView: loginUser.role == 'Dealer', // Added the isView property
    },
    {
      path: '/account-management',
      label: 'Manage Users',
      icon: <ManageUserIcos />,
      condition: (pathname: string) => pathname.includes('account-management'),
      children: [
        {
          path: '/account-management/manage-admin',
          label: 'Manage Admin',
          icon: '',
          condition: (pathname: string) => pathname.includes('manage-admin'),
          isView: loginUser.role == 'SuperAdmin' ? true : false, // Added the isView property
        },
        {
          path: '/account-management/manage-dealer',
          label: 'Manage Dealer',
          icon: '',
          condition: (pathname: string) => pathname.includes('manage-dealer'),
          isView:true, // Added the isView property
        },
        {
          path: '/account-management/manage-subscriber',
          label: 'Manage Subscriber',
          icon: '',
          condition: (pathname: string) =>
            pathname.includes('manage-subscriber'),
          isView: true, // Added the isView property
        },
      ],
      isView:
        loginUser.role === 'SuperAdmin' || loginUser.role === 'Admin'
          ? true
          : false, // Added the isView property
    },
    {
      path: '/Manage-device',
      label: 'View Device',
      icon: <ManageDeviceIcons />,
      condition: (pathname: string) => pathname === '/Manage-device',
      isView:
        loginUser.role === 'SuperAdmin' || loginUser.permissions?.Manage_Device?.View
          ? true
          : false, // Added the isView property
    },
  
    {
      path: '/map-overview',
      label: 'Map Overview',
      icon: <MapOverViewIcons />,
      condition: (pathname: string) => pathname.includes('map-overview'),
      isView:
        loginUser.role == 'SuperAdmin' || loginUser?.permissions?.Map_Overview?.View
          ? true
          : false, // Added the isView property
    },
    {
      path: '/Reports',
      label: 'Reports',
      icon: <ReportsIcons />,
      isView: loginUser?.permissions?.Reports?.View || loginUser?.role=="SuperAdmin", // Added the isView property
      condition: (pathname: string) =>
        pathname.includes('/device-management/Reports'),
    },
    {
      path: '/device-management/Root-History',
      label: 'Route History',
      icon: <RouteHistoryIcons />,
      isView:  loginUser.role === 'SuperAdmin' || loginUser.permissions?.Route_History?.View
      ? true
      : false, // Added the isView property
      condition: (pathname: string) =>
        pathname.includes('/device-management/Root-History'),
    },
    {
      path: '/manage-Inventory',
      label: 'Manage Inventory',
      icon: <ManageinventryIcon/>,
      isView: loginUser.role === 'SuperAdmin', // Added the isView property
      condition: (pathname: string) =>
        pathname.includes('/manage-Inventory'),
    },
    // {
    //   path: '/sim-managment',
    //   label: 'Sim Managment',
    //   icon: '',
    //   isView: true, // Added the isView property
    //   condition: (pathname: string) =>
    //     pathname.includes('/sim-managment'),
    // },
    {
      path: '/notifications',
      label: 'Notifications',
      icon: <NotificationsIcons />,
      condition: (pathname: string) => pathname.includes('notifications'),
      isView:
        loginUser.role === 'SuperAdmin' || loginUser.role === 'Admin'
          ? true
          : false, // Corrected condition
    },
    {
      path: '/support',
      label: 'Requests',
      icon: <SuportIcons />,
      condition: (pathname: string) => pathname.includes('support'),
      children: [
        {
          path: '/support/subscribers',
          label: 'Subscriber Requests',
          icon: '',
          isView:loginUser.role == 'SuperAdmin' || loginUser?.permissions?.Subscriber_Support?.View
          ? true
          : false, // Added the isView property
          condition: (pathname: string) =>
            pathname.includes('account-management'),
        },
        {
          path: '/support/dealers',
          label: 'Dealer Requests',
          icon: '',
          isView:loginUser.role == 'SuperAdmin' || loginUser?.permissions?.Dealer_Vehicle_Request?.View, // Added the isView property
          condition: (pathname: string) =>
            pathname.includes('account-management'),
        },
        {
          path: '/support/Renew',
          label: 'Renew Requests',
          icon: '',
          isView:loginUser.role == 'SuperAdmin' || loginUser?.permissions?.Renew_Request?.View, // Added the isView property
          condition: (pathname: string) =>
            pathname.includes('account-management'),
        },
      ],
      isView: true, // Added the isView property
    },
    {
      path: '/device-management',
      label: 'Manage Type',
      icon: <ManageType />,
      condition: (pathname: string) => pathname.includes('device-management'),
      children: [
        {
              path: '/device-management/gps/add-device',
              label: 'Add Device Type',
              icon: '',
              isView: loginUser?.permissions?.Manage_Type_Vehicle_Icon?.View || loginUser.role=="SuperAdmin", // Added the isView property
              condition: (pathname: string) =>
              pathname.includes('/device-management/gps/add-devices'),
        },
        {
          path: '/device-management/vehicle-icons',
          label: 'Add Vehicle Icons',
          icon: "",
          isView: loginUser?.permissions?.Manage_Type_Vehicle_Icon?.View || loginUser.role=="SuperAdmin", // Added the isView property
          condition: (pathname: string) =>
            pathname.includes('/device-management/vehicle-icons'),
        },
  
       
      ],
      isView: loginUser?.permissions?.Manage_Type_Vehicle_Icon?.View || loginUser.role=="SuperAdmin" // Added the isView property
    },
    {
      path: '/device-management/app-settings',
      label: 'App Settings',
      icon: <ApplicationSetting/>,
      isView: loginUser?.role=="SuperAdmin", // Make sure this is true
      condition: (pathname: string) =>
        pathname.includes('/device-management/app-settings'),
     
        children: [
             {
              path: '/device-management/content/maintenance',
              label: 'Maintenance',
              icon: '',
              isView: true, // Ensure it's not false
              condition: (pathname: string) =>
                pathname.includes('/device-management/content/maintenance'),
            },
        {
          path: '/device-management/app-settings/content-manager',
          label: 'Content Manager',
          icon: '',
          isView: true, // Check this too
          condition: (pathname: string) =>
            pathname.includes(
              '/device-management/app-settings/content-manager',
            ),

          children: [
            {
              path: '/device-management/content/about-us',
              label: 'About us',
              icon: '',
              isView: true, // Ensure it's not false
              condition: (pathname: string) =>
                pathname.includes('/device-management/content/about-us'),
            },
            {
              path: '/device-management/content/privacy-policy',
              label: 'Privacy Policy',
              icon: '',
              isView: true, // Added the isView property
              condition: (pathname: string) =>
                pathname.includes(
                  '/device-management/content/privacy-policy',
                ),
            },
            {
              path: '/device-management/content/terms-of-use',
              label: 'Terms of Use',
              icon: '',
              isView: true, // Added the isView property
              condition: (pathname: string) =>
                pathname.includes(
                  '/device-management/content/terms-of-use',
                ),
            },
            {
              path: '/device-management/content/faqs',
              label: 'FAQs Topics',
              icon: '',
              isView: true, // Added the isView property
              condition: (pathname: string) =>
                pathname.includes('/device-management/content/faqs'),
            },
            {
              path: '/device-management/content/faqs-content',
              label: 'FAQs Content',
              icon: '',
              isView: true, // Added the isView property
              condition: (pathname: string) =>
                pathname.includes(
                  '/device-management/content/faqs-content',
                ),
            },
          ],
        },
        {
          path: '/device-management/app-settings/customization',
          label: 'App Customization',
          icon: '',
          isView: true, // Ensure this is true
          condition: (pathname: string) =>
            pathname.includes(
              '/device-management/app-settings/customization',
            ),
          children: [
            {
              path: '/device-management/customization/splash-screen',
              label: 'Splash Image',
              icon: '',
              isView: true, // Added the isView property
              condition: (pathname: string) =>
                pathname.includes(
                  '/device-management/customization/splash-screen',
                ),
            },
            {
              path: '/device-management/customization/settings-screen',
              label: 'Settings Ad Image ',
              icon: '',
              isView: true, // Added the isView property
              condition: (pathname: string) =>
                pathname.includes(
                  '/device-management/customization/settings-screen',
                ),
            },
            {
              path: '/device-management/customization/settings',
              label: 'Settings',
              icon: '',
              isView: true, // Added the isView property
              condition: (pathname: string) =>
                pathname.includes(
                  '/device-management/customization/settings',
                ),
            },
          ],
        },

      ],
    },
  ];
};
