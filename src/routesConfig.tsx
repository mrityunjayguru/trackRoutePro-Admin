import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/AdminDashboard';
import Users from './pages/ManageUsers/Users';
import ViewSubscribers from './pages/ManageUsers/Component/Subscriber/ViewSubscribers';
import Edituser from './pages/ManageUsers/Component/Subscriber/Edituser';
import EditDevices from './pages/ManageUsers/Component/Devices/EditDevices';
import VeiwDevices from './pages/ManageUsers/Component/Devices/VeiwDevices';
import AddSubscribe from './pages/ManageUsers/Component/Subscriber/AddSubscribe';
import AddDevices from './pages/ManageUsers/Component/Devices/AddDevices';
import AdminRoles from './pages/AdminRoles/AdminRoles';
import ManageAdmin from './pages/AdminRoles/Component/ManageAdmin';
import Vehicle from './pages/Manage/Vehicle/Vehicle';
import Splash from './pages/Manage/SplashAdd/Splash';
import Setting from './pages/Manage/Setting/Setting';
import About from './pages/Manage/About/About';
import Privacy from './pages/Manage/PrivacyPolicy/Privacy';
import FaqTopics from './pages/Manage/FaQTopics/FaqTopics';
import FaQ from './pages/Manage/FaQ/FaQ';
import Notification from './pages/Notification/Notification';
import Mapoverview from './pages/MapOverView/mapoverview';
import AddList from './pages/Manage/FaQ/Component/AddList';
import EditFaQlist from './pages/Manage/FaQ/Component/EditFaQlist';
import AddTopicsList from './pages/Manage/FaQTopics/Component/AddTopicsList';
import EdiTopicsList from './pages/Manage/FaQTopics/Component/EdiTopicsList';
import EditAdmin from './pages/AdminRoles/Component/EditAdmin';
import ExpiryList from './pages/Manage/ExpiryList/ExpiryList';
import Suport from './pages/Suports/Suport';
import ViewAdmin from './pages/AdminRoles/Component/ViewAdmin';
import Settings from './pages/Settings';
import AddDeviceType from './pages/ManageUsers/Component/DeviceType/AddDeviceType';
import DeviceTypeTable from './pages/ManageUsers/Component/DeviceType/DeviceTypeTable';
import EditDeviceType from './pages/ManageUsers/Component/DeviceType/EditDeviceType';
import Request from './pages/Request/Request';
import Delear from './pages/Delear/Delear';
import AddDelear from './pages/Delear/Component/Delear/AddDelear';
import ViewDelear from './pages/Delear/Component/Delear/ViewDelear';
import AddSubscriberByDelear from './pages/Delear/Component/user/AddSubscriberByDelear';
import ViewUserBydelear from './pages/Delear/Component/user/ViewUserBydelear';
import AddDevicesByDelear from './pages/Delear/Component/Device/AddDevicesByDelear';
import ViewDelearDevices from './pages/Delear/Component/Device/ViewDelearDevices';
import EditDelearDevice from './pages/Delear/Component/Device/EditDelearDevice';
import EditDelear from './pages/Delear/Component/Delear/EditDelear';
import ViewRequest from './pages/Request/Component/ViewRequest';
import EditRequest from './pages/Request/Component/EditRequest';
import DelearDashboard from './pages/DelearDashboard/DelearDashboard';
import DealerAddSubscriber from './pages/DelearDashboard/Component/Subscriber/DealerAddSubscriber';
import DealerViewSubscriber from './pages/DelearDashboard/Component/Subscriber/DealerViewSubscriber';
import DealerEditSubscriber from './pages/DelearDashboard/Component/Subscriber/DealerEditSubscriber';
import DealerAddDevices from './pages/DelearDashboard/Component/Subscriber/DealerAddDevices';
import DealerViewDevices from './pages/DelearDashboard/Component/Subscriber/DealerViewDevices';
import EditDealerDevices from './pages/DelearDashboard/Component/Subscriber/EditDealerDevices';
import Profile from './pages/Profile/Profile';
import DeviceDetail from './pages/Manage/DeviceDetail/DeviceDetail';
import AddDeviceDetail from './pages/Manage/DeviceDetail/Component/AddDeviceDetail';
import ViewDeviceDetail from './pages/Manage/DeviceDetail/Component/ViewDeviceDetail';
import TermAndCondition from './pages/Manage/termAndCondition/termAndCondition';
import EdutUserByDelear from './pages/Delear/Component/user/EdutUserByDelear';
import Existignuser from './pages/DelearDashboard/Component/Subscriber/Existinguser/Existignuser';
import HeaderCommon from './pages/Request/Component/HeaderCommon';
import ViewDelearRequestDevices from './pages/Request/Component/Devices/ViewDelearRequestDevices';
import EditDelearRequestDevices from './pages/Request/Component/Devices/EditDelearRequestDevices';
import Renew from './pages/Request/Component/Renew/Renew';
import ManageRenew from './pages/Request/Component/Renew/ManageRenew';
import Root from './pages/Manage/RootHistory/Root';
import Reports from './pages/Reports/Reports';
import ReportRecord from './pages/Reports/component/ReportRecord';
import ManageDevices from './components/Manage-Devies/ManageDevices';
import ViewMap from './components/Manage-Devies/Component/ViewMap';
import SimManagment from './components/Sim-Managment/SimManagment';
import EcommDshboard from './pages/Ecomm/dashboard/EcommDshboard';
import GpsDevices from './pages/Ecomm/Gps-Device/Index';
import Addons from './pages/Ecomm/AddOns/Addons';
import SaleseTeam from './pages/Ecomm/Sales-Team/SaleseTeam';
import DiscountCopoun from './pages/Ecomm/Discount-Copoun/DiscountCopoun';
import ManageInvoice from './pages/Ecomm/Manage-Invoice/ManageInvoice';
import NotificationIndex from './pages/Ecomm/Notification/NotificationIndex';
import Maintannance from './pages/Manage/Maintanance/Maintannance';
export const routes = [
  { path: '/auth/signin', title: 'TRP Signin', component: <SignIn /> },
  { path: '/', title: 'TRP ashboard', component: <ECommerce /> },
  { path: '/dashboard', title: 'TRP Dashboard', component: <ECommerce /> },

  { path: '/deviceType', title: 'TRP Signin', component: <AddDeviceType /> },
  {
    path: '/device-management/gps/add-device',
    title: 'TRP Device Type Management',
    component: <DeviceTypeTable />,
  },
  {
    path: '/EditDeviceType',
    title: 'TRP Signin',
    component: <EditDeviceType />,
  },

  { path: '/support/dealers', title: 'TRP Manage Dealer Request', component: <HeaderCommon /> },
  { path: '/support/dealers/view-Device', title: 'TRP Manage Dealer Request', component: <ViewDelearRequestDevices /> },
  { path: '/support/dealers/Edit-Devices', title: 'TRP Manage Dealer Request', component: <EditDelearRequestDevices /> },
  { path: '/support/Renew', title: 'TRP Manage User Request', component: <Renew /> },
  { path: '/support/Renew/manage', title: 'TRP Manage User Request', component: <ManageRenew /> },




  {
    path: '/account-management/manage-dealer',
    title: 'TRP Manage Dealer',
    component: <Delear />,
  },
  { path: '/AddDelear', title: 'TRP AddDelear', component: <AddDelear /> },
  { path: '/ViewDelear', title: 'TRP ViewDelear', component: <ViewDelear /> },
  { path: '/EditDelear', title: 'TRP EditDelear', component: <EditDelear /> },
  {
    path: '/ViewRequest',
    title: 'TRP ViewRequest',
    component: <ViewRequest />,
  },
  {
    path: '/EditRequest',
    title: 'TRP EditRequest',
    component: <EditRequest />,
  },

  {
    path: '/AddSubscriberByDelear',
    title: 'TRP AddSubscriberByDelear',
    component: <AddSubscriberByDelear />,
  },
  {
    path: '/ViewUserBydelear',
    title: 'TRP ViewUserBydelear',
    component: <ViewUserBydelear />,
  },
  {
    path: '/AddDevicesByDelear',
    title: 'TRP AddDevicesByDelear',
    component: <AddDevicesByDelear />,
  },
  {
    path: '/ViewDelearDevices',
    title: 'TRP ViewDelearDevices',
    component: <ViewDelearDevices />,
  },
  {
    path: '/EditDelearDevice',
    title: 'TRP EditDelearDevice',
    component: <EditDelearDevice />,
  },

  { path: '/profile', title: 'TRP Profile', component: <Profile /> },
  {
    path: '/account-management/manage-subscriber',
    title: 'TRP Manage Subscriber',
    component: <Users />,
  },
  {
    path: '/account-management/manage-subscriber/view-subscriber/:userId',
    title: 'TRP View Subscriber',
    component: <ViewSubscribers />,
  },
  {
    path: '/account-management/manage-subscriber/edit-subscriber/:userId',
    title: 'TRP Edit User',
    component: <Edituser />,
  },
  {
    path: '/account-management/manage-subscriber/EdutUser-ByDelear/:userId',
    title: 'TRP Edit User',
    component: <EdutUserByDelear />,
  },

  {
    path: '/account-management/devices/edit-devices',
    title: 'TRP Edit Devices',
    component: <EditDevices />,
  },
  {
    path: '/account-management/devices/view-devices',
    title: 'TRP View Devices',
    component: <VeiwDevices />,
  },
  {
    path: '/account-management/manage-subscriber/add',
    title: 'TRP Add Subscribers',
    component: <AddSubscribe />,
  },

  {
    path: '/account-management/manage-subscriber/add-device',
    title: 'TRP Add Device',
    component: <AddDevices />,
  },
  {
    path: '/account-management/manage-admin',
    title: 'TRP Manage Admin',
    component: <AdminRoles />,
  },
  {
    path: '/admin-roles/add-admin-roles',
    title: 'TRP Manage Admin',
    component: <ManageAdmin />,
  },
  {
    path: '/device-management/vehicle-icons',
    title: 'TRP Manage Vehicle Icons',
    component: <Vehicle />,
  },
  {
    path: '/device-management/customization/splash-screen',
    title: 'TRP Splash Screen Banner',
    component: <Splash />,
  },
  {
    path: '/device-management/customization/settings-screen',
    title: 'TRP Setting Screen Banners',
    component: <Setting />,
  },

  {
    path: '/device-management/content/about-us',
    title: 'TRP Manage About Us',
    component: <About />,
  },
  {
    path: '/device-management/content/privacy-policy',
    title: 'TRP Manage Privacy Policy',
    component: <Privacy />,
  },
  {
    path: '/device-management/content/faqs',
    title: 'TRP Manage FAQs Topic',
    component: <FaqTopics />,
  },
  {
    path: '/device-management/content/faqs-content',
    title: 'TRP Manage FAQs Content',
    component: <FaQ />,
  },
  {
    path: '/device-management/customization/settings',
    title: 'TRP Settings',
    component: <Settings />,
  },

  {
    path: '/notifications',
    title: 'TRP Notification',
    component: <Notification />,
  },
  {
    path: '/map-overview',
    title: 'TRP Map Overview',
    component: <Mapoverview />,
  },
  { path: '/manage/add-list', title: 'TRP Add List', component: <AddList /> },
  {
    path: '/manage/edit-faqs',
    title: 'TRP Edit FAQs',
    component: <EditFaQlist />,
  },
  {
    path: '/manage-Inventory',
    title: 'TRP Manage-Inventory',
    component: <DeviceDetail />,
  },
  {
    path: 'manage/AddDeviceDetail',
    title: 'TRP Edit FAQs',
    component: <AddDeviceDetail />,
  },
  {
    path: '/manage/viewDeviceDetail',
    title: 'TRP Edit FAQs',
    component: <ViewDeviceDetail />,
  },

  {
    path: '/device-management/content/terms-of-use',
    title: 'TRP Manage Terms of Use',
    component: <TermAndCondition />,
  },
  {
    path: '/manage/add-topic-list',
    title: 'TRP Add Topic List',
    component: <AddTopicsList />,
  },
  {
    path: '/manage/edit-topic-list',
    title: 'TRP Edit Topic List',
    component: <EdiTopicsList />,
  },
  {
    path: '/device-management/Root-History',
    title: 'TRP Edit Topic List',
    component: <Root />,
  },
  {
    path: '/admin-roles/edit-admin-roles',
    title: 'TRP Edit Admin Roles',
    component: <EditAdmin />,
  },
  { path: '/view-admin', title: 'TRP View Admin', component: <ViewAdmin /> },
  { path: '/support/subscribers', title: 'TRP Support-Subscribers', component: <Suport /> },

  {
    path: '/manage/deviceList',
    title: 'TRP Device List',
    component: <ExpiryList />,
  },

  //dealer dashboard
  {
    path: '/DealearDashboard',
    title: 'TRP Manage Subscribers',
    component: <DelearDashboard />,
  },
  {
    path: '/DealerAddSubscriber',
    title: 'TRP DealerAddSubscriber',
    component: <DealerAddSubscriber />,
  },
  {
    path: '/DealerViewSubscriber',
    title: 'TRP DealerViewSubscriber',
    component: <DealerViewSubscriber />,
  },
  {
    path: '/DealerEditSubscriber',
    title: 'TRP DealerEditSubscriber',
    component: <DealerEditSubscriber />,
  },
  {
    path: '/DealerAddDevices',
    title: 'TRP DealerAddDevices',
    component: <DealerAddDevices />,
  },
  {
    path: '/DealerViewDevices',
    title: 'TRP DealerViewDevices',
    component: <DealerViewDevices />,
  },
  {
    path: '/EditDealerDevices',
    title: 'TRP EditDealerDevices',
    component: <EditDealerDevices />,
  },
  {
    path: '/existignuser',
    title: 'TRP Add Subscriber',
    component: <Existignuser />,
  },
  
// Manage Reports
{
  path: '/Reports',
  title: 'Reports',
  component: <Reports />,
},
{
  path: '/Reports/records',
  title: 'Reports',
  component: <ReportRecord />,
},

  {
    path: 'Manage-device/view-map',
    title: 'Manage-device',
    component: <ViewMap />,
  },
{
  path: '/Manage-device',
  title: 'Manage-device',
  component: <ManageDevices />,
},
{
  path: '/sim-managment',
  title: 'sim-managment',
  component: <SimManagment />,
},
{
  path: '/device-management/content/maintenance',
  title: 'maintenance',
  component: <Maintannance />,
},
// ecomm routes
{
  path: '/ecommdashboard',
  title: 'ecommdashboard',
  component: <EcommDshboard />,
},
{
  path: '/ecommdashboard/gps_devices',
  title: 'gps_devices',
  component: <GpsDevices />,
},
{
  path: '/ecommdashboard/add_ons',
  title: 'add_ons',
  component: <Addons />,
},
{
  path: '/ecommdashboard/sales-team',
  title: 'sales-team',
  component: <SaleseTeam />,
},
{
  path: '/ecommdashboard/Discount-Coupon',
  title: 'Discount-Coupon',
  component: <DiscountCopoun />,
},
{
  path: '/ecommdashboard/Manage-Invoices',
  title: 'Manage-Invoices',
  component: <ManageInvoice />,
},
//salesApp managment

{
  path: '/salesApp',
  title: 'salesApp',
  component: <EcommDshboard />,
},

{
  path: '/salesApp/sales-team',
  title: 'sales-team',
  component: <SaleseTeam />,
},
{
  path: '/salesApp/Discount-Coupon',
  title: 'Discount-Coupon',
  component: <DiscountCopoun />,
},
{
  path: '/salesApp/Notification',
  title: 'Notification',
  component: <NotificationIndex />,
},

];
