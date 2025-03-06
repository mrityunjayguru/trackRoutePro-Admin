import { Link, useParams, useLocation } from 'react-router-dom';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../common/Breadcrumb';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const location = useLocation();
  const { userId } = useParams(); // Extract userId from params
  const [title, setTitle] = useState<string>('');

  // Define a mapping of pathnames to titles
  const pageTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/account-management/manage-admin': 'Manage Admin',
    '/account-management/manage-dealer': 'Manage Dealer',
    '/account-management/manage-subscriber': 'Manage Subscriber',
    '/map-overview': 'Map Overview',
    '/notifications': 'Notifications',
    '/support/subscribers': 'Support-Subscribers',
    '/support/dealers': 'Manage Dealer Request',
    '/device-management/gps/add-device': 'Device Type Management',
    '/device-management/gps/manage-Inventory': 'Manage-Inventory',
    '/device-management/vehicle-icons': 'Manage Vehicle Icons',
    '/device-management/content/about-us': 'Manage About Us',
    '/device-management/content/privacy-policy': 'Manage Privacy Policy',
    '/device-management/content/terms-of-use': 'Manage Terms of Use',
    '/device-management/content/faqs': 'Manage FAQs Topic',
    '/device-management/content/faqs-content': 'Manage FAQs Content',
    '/device-management/customization/splash-screen': 'Splash Screen Banner',
    '/device-management/customization/settings-screen': 'Setting Screen Banners',
    '/device-management/customization/settings': 'Settings',
    '/manage/Add-List': 'Add FAQs',
    '/Admin-Roles/Add-Admin-Roles': 'Admin Roles',
    '/manage/add-subscribers': 'Add Subscribers',
    '/Add-device': 'Add Device',
    '/View-Devices': 'View Device',
    '/Edit-Devices': 'Edit Devices',
    '/manage/ManageDevice': 'Device Type',
    '/deviceType': 'Add DeviceType',
    '/EditDeviceType': 'Edit DeviceType',
    '/manage/edit-Topic-List': 'Edit Topic List',
    '/Manage/Edit-FAQs': 'Edit FAQs',
    "/Reports":"Report's",
    "/Reports/records":"Report's",
    '/Request': 'Request',
    '/Delear': 'Dealer Management',
    '/AddDelear': 'Add Dealer',
    '/ViewDelear': 'View Dealer',
    '/EditDelear': 'Edit Delear Dealer',
    '/ViewRequest': 'View Request',
    '/EditRequest': 'Edit Request',
    '/ViewUserBydelear': 'View Subscriber',
    '/AddDevicesByDelear': 'Add Device',
    '/ViewDelearDevices': 'View Device',
    '/DealerAddSubscriber': 'Add Subscriber',
    '/existignuser': 'Add Subscriber',

    
  };

  useEffect(() => {
    let updatedTitle = pageTitles[location.pathname] || 'Manage';

    // Check for dynamic paths that contain an ID
    if (location.pathname.startsWith('/account-management/manage-subscriber/view-subscriber')) {
      updatedTitle = `View Subscriber ${userId ? `- ID: ${userId}` : ''}`;
    } else if (location.pathname.startsWith('/account-management/manage-subscriber/Edit-subscriber')) {
      updatedTitle = `Edit Subscriber ${userId ? `- ID: ${userId}` : ''}`;
    }

    setTitle(updatedTitle);
  }, [location.pathname, userId]); // Re-run effect when pathname or userId changes

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div>
          <h1 className="block text-2xl font-medium text-black dark:text-white">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle Button */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* User Area */}
            <DropdownUser />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
