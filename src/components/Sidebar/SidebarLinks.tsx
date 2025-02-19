import { useSelector } from 'react-redux';
import {
  AddVehicleIcon,
  DeviceManager,
  ManageIcons,
  ManageSubscriberIcos,
  ManageSubscribersIcon,
  NotificationsIcons,
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
      label: 'DealearDashboard',
      icon: <ManageSubscribersIcon />,
      condition: (pathname: string) => pathname === '/DealearDashboard',
      isView: loginUser.role == 'Dealer', // Added the isView property
    },
    {
      path: '/account-management',
      label: 'Account Management',
      icon: <ManageSubscriberIcos />,
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
          isView: loginUser.role == 'SuperAdmin' ? true : false, // Added the isView property
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
      path: '/map-overview',
      label: 'Map Overview',
      icon: <ManageSubscribersIcon />,
      condition: (pathname: string) => pathname.includes('map-overview'),
      isView:
        loginUser.role == 'SuperAdmin' || loginUser?.permissions?.Map?.View
          ? true
          : false, // Added the isView property
    },
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
      label: 'Support',
      icon: <SuportIcons />,
      condition: (pathname: string) => pathname.includes('support'),
      children: [
        {
          path: '/support/subscribers',
          label: 'Subscriber Support',
          icon: '',
          isView:
            loginUser.role == 'SuperAdmin' ||
            loginUser?.permissions?.Support?.View
              ? true
              : false, // Added the isView property
          condition: (pathname: string) =>
            pathname.includes('account-management'),
        },
        {
          path: '/support/dealers',
          label: 'Dealer Support',
          icon: '',
          isView: loginUser.role == 'SuperAdmin', // Added the isView property
          condition: (pathname: string) =>
            pathname.includes('account-management'),
        },
        // {
        //   path: '/support/Renew',
        //   label: 'User renew',
        //   icon: '',
        //   isView: loginUser.role == 'SuperAdmin', // Added the isView property
        //   condition: (pathname: string) =>
        //     pathname.includes('account-management'),
        // },
      ],
      isView:
        loginUser.role == 'SuperAdmin' || loginUser?.permissions?.Support?.View
          ? true
          : false, // Added the isView property
    },
    {
      path: '/device-management',
      label: 'Manage',
      icon: <ManageIcons />,
      condition: (pathname: string) => pathname.includes('device-management'),
      children: [
        {
          path: '/device-management/gps',
          label: 'GPS Devices',
          icon: <DeviceManager />,
          condition: (pathname: string) =>
            pathname.includes('/device-management/gps'),

          subChildren: [
            {
              path: '/device-management/gps/add-device',
              label: 'Add Device Type',
              icon: '',
              isView: true, // Added the isView property
              condition: (pathname: string) =>
                pathname.includes('/device-management/gps/add-devices'),
            },
            {
              path: '/device-management/gps/manage-Inventory',
              label: 'Manage Inventory',
              icon: '',
              isView: true, // Added the isView property
              condition: (pathname: string) =>
                pathname.includes('/device-management/gps/manage-Inventory'),
            },
          ],
          isView: true, // Added the isView property
        },
        {
          path: '/device-management/vehicle-icons',
          label: 'Add Vehicle Icons',
          icon: <AddVehicleIcon />,
          isView: true, // Added the isView property
          condition: (pathname: string) =>
            pathname.includes('/device-management/vehicle-icons'),
        },
        {
          path: '/device-management/app-settings',
          label: 'Application Settings',
          icon: '',
          isView: true, // Make sure this is true
          condition: (pathname: string) =>
            pathname.includes('/device-management/app-settings'),

          children: [
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
                  label: 'Splash Screen',
                  icon: '',
                  isView: true, // Added the isView property
                  condition: (pathname: string) =>
                    pathname.includes(
                      '/device-management/customization/splash-screen',
                    ),
                },
                {
                  path: '/device-management/customization/settings-screen',
                  label: 'Settings Screen',
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
      ],
      isView: loginUser.role == 'SuperAdmin' ? true : false, // Added the isView property
    },
  ];
};
