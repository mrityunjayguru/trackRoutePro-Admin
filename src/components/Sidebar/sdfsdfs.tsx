import {
    AddVehicleIcon,
    AdminRolesIcons,
    DeviceManager,
    DeviceType,
    ManageAdmins,
    ManageDealer,
    ManageEventry,
    ManageIcons,
    ManageSubscriberIcos,
    ManageSubscribersIcon,
    MapOverViewIcons,
    NotificationsIcons,
    ProfileIcon,
    RequestIcons,
    SuportDealer,
    SuportIcons,
    SuportSubscriber,
  } from './SideBarSvgIcons';
  
  export const sidebarRoutes = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <ManageSubscribersIcon />,
      condition: (pathname: string) => pathname === '/dashboard',
      childern:[]
    },
    {
      path: '/account-management',
      label: 'Account Management',
      icon: <ManageSubscriberIcos/>,
      condition: (pathname: string) => pathname.includes('account-management'),
      children: [
        {
          path: '/account-management/manage-admin',
          label: 'Manage Admin',
          icon: <ManageAdmins/>,
          condition: (pathname: string) => pathname.includes('manage-admin'),
        },
        {
          path: '/account-management/manage-dealer',
          label: 'Manage Dealer',
          icon: <ManageDealer />,
          condition: (pathname: string) => pathname.includes('manage-dealer'),
        },
        {
          path: '/account-management/manage-subscriber',
          label: 'Manage Subscriber',
          icon: <ManageSubscriberIcos />,
          condition: (pathname: string) => pathname.includes('manage-subscriber'),
        },
      ],
    },
  
  ];
  
  
  export const manageRoutes = [
    {
      path: '/map-overview',
      label: 'Map Overview',
      icon: <ManageSubscribersIcon />,
      condition: (pathname: string) => pathname.includes('map-overview'),
    },
    {
      path: '/notifications',
      label: 'Notifications',
      icon: <NotificationsIcons />,
      condition: (pathname: string) => pathname.includes('notifications'),
    },
    {
      path: '/support',
      label: 'Support',
      icon: <SuportIcons />,
      children: [
        { path: '/support/subscribers', label: 'Subscriber Support', icon: <SuportSubscriber/> },
        { path: '/support/dealers', label: 'Dealer Support', icon:<SuportDealer/> },
      ],
    },
    {
      path: '/device-management',
      label: 'Manage',
      icon: <ManageIcons />,
      children: [
        {
          path: '/device-management/gps',
          label: 'GPS Devices',
          icon: <DeviceManager/>,
          subChildren: [
            {
              path: '/device-management/gps/add-device',
              label: 'Add Device Type',
              icon: <DeviceType/>,
            },
            {
              path: '/device-management/gps/manage-Inventory',
              label: 'Manage Inventory',
              icon:<ManageEventry/>,
            },
          ],
        },
        {
          path: '/device-management/vehicle-icons',
          label: 'Add Vehicle Icons',
          icon:<AddVehicleIcon/>,
        },
        {
          path: '/device-management/app-settings',
          label: 'Application Settings',
          icon: '',
          subChildren: [
            {
              path: '/device-management/app-settings/content-manager',
              label: 'Content Manager',
              icon: '',
              children: [
                {
                  path: '/device-management/content/about-us',
                  label: 'About us',
                  icon: '',
                },
                {
                  path: '/device-management/content/privacy-policy',
                  label: 'Privacy Policy',
                  icon: '',
                },
                {
                  path: '/device-management/content/terms-of-use',
                  label: 'Terms of Use',
                  icon: '',
                },
                {
                  path: '/device-management/content/faqs',
                  label: 'FAQs Topics',
                  icon: '',
                },
                {
                  path: '/device-management/content/faqs-content',
                  label: 'FAQs Content',
                  icon: '',
                },
              ]
            },
            {
              path: '/device-management/app-settings/customization',
              label: 'App Customization',
              icon: '',
              children: [
                {
                  path: '/device-management/customization/splash-screen',
                  label: 'Splash Screen',
                  icon: '',
                },
                {
                  path: '/device-management/customization/settings-screen',
                  label: 'Settings Screen',
                  icon: '',
                },
                {
                  path: '/device-management/customization/settings',
                  label: 'Settings',
                  icon: '',
                },
              ]
            },
          ],
        },
      ],
    },
  ];
  
  
  
  