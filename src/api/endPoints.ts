import { update } from "lodash";

const BillboardAPI = {
  getBillboard: 'Blog/get',
  addBillboard: 'Blog/add',
  updateBillboard: 'Blog/update',
  Dashboardcount: 'Blog/dashboard',
};

const Users = {
  alluser: 'allusers',
  updateuser: 'updateuser',
  checkExistingUser:"user/existingUser"
};

const subscribers = {
  subscribers: 'subscribers/getSubscribers',
  updateSubscriber: 'Auth/updateUser',
  addNewSubscriber: 'Auth/createUser',
  groupSubesciber: 'subscribers/groupSubescriber',
  delearSubscriber: 'subscribers/getDelearSubscriber',
  getDelearRecord: 'subscribers/getDelearRecord',
  subscriberByDelear: 'subscribers/getRecordAddedByDelear',
  getDealearSuport: 'subscribers/getDealearSuport',

};
const vehicleType = {
  createVehicle: 'vehicleType/create',
  VehicleTypes: 'vehicleType/get',
  updatevehicle: 'vehicleType/update',
};
const dashboard = {
  getDashboard: 'dashboard/get',
};
const device = {
  createDevice: 'vehicle/create',
  updateDevices: 'vehicle/update',
  geDevices: 'vehicle/get',
  updateMany:'vehicle/updateMany',
  devicesByOwnerID:'vehicle/devicesByOwnerID',
  dealearRecord:'subscribers/getUserUserCode',
  getRenewRequest:'vehicle/getRenewRequest',

};
const privacyPolicy = {
  createprivacyPolicy: 'privacyPolicy/create',
  getPrivacyPolicy: 'privacyPolicy/get',
  updatePrivacyPolicy: 'privacyPolicy/update',
};
const TermAndCondition = {
  createTermAndCondition:'termAndCondition/create',
  getTermAndCondition:'termAndCondition/get',
  updateTermAndCondition:'termAndCondition/update',
};
const splash = {
  createsplash: 'splashAd/create',
  getsplash: 'splashAd/get',
  updateSplash: 'splashAd/update',
};
const setting = {
  createsetting: 'setting/create',
  getsetting: 'setting/get',
};
const aboutUs = {
  createaboutus: 'about/create',
  getAboutus: 'about/get',
  updateAboutus: 'about/update',
};

const adminauthAPI = {
  login: 'adminAuth/login',
  register: 'auth/signup',
  LdapLogin: 'LDAPLOGIN',
  updateprofile: 'auth/updateUser',
  sendotp: 'auth/send_otp',
  resetpassword: 'auth/reset_password',
  alluser: 'auth/alluser',
  updatePassword:"/admin/reset_password"
};
const FaQList = {
  createFaQList: 'FaQlist/create',
  updateFaQlist: 'FaQlist/update',
  getFaQList: 'FaQlist/get',
  deleteFaqList: 'FaQlist/delete',
};
const FaQPriority = {
  createFaQPriority: 'FaQtopic/create',
  updateFaQPriority: 'FaQtopic/update',
  getFaQPriority: 'FaQtopic/get',
  deleteFaQPriority: 'FaQtopic/delete',
};
const Admin = {
  addadmin: 'admin/createAdmin',
  allAdmin:"admin/All-Admin",
  updateAdmin:"admin/updateAdmin",
  RootHistory:"trackVehicle/AdminrootHistory",
  summaryReports:"/SummaryReport/travelSummary",
  traivelReport:"/SummaryReport/consolidateSummary",
  tripSummary:"/SummaryReport/tripSummary",
  eventReports:"/SummaryReport/eventReport",
  distanceReport:"/SummaryReport/monthlyDistance",
  stopAndIdols:"/SummaryReport/idelLogs",
  AlertsReport:"/SummaryReport/AlertsReport"
};
const ReportsUser={
  ReportsUser:"Reports/get"
};
const getmanageSetting={
  getmanageSetting: 'managesetting/get',
  updatemanageSetting:"managesetting/update",
  createmanageSetting:"managesetting/create",
}
const mapdetails={
  getmanageMap: 'trackVehicle/getByVehicleID',
  searchuser:'trackVehicle/searchuser',
  searchDevices:'trackVehicle/searchDevices',
}
const Notification={
  createNotification: 'notification/send',
  getNotification:'notification/get',
  sendPushNotification:"notification/sendPushNotification"

}
const suport={
  getsupoer:"suport/get",
  updateSuport:"suport/update"
}
const deviceType={
  createDeviceType:"deviceType/create",
  getDeviceType:"deviceType/get",
  updateDeviceType:"deviceType/update"
}
const deviceDetails={
  createDeviceDetailWithExcel:"Imei/createwithExcel",
  updateDeviceDetail:"Imei/update",
  createDeviceDetail:"Imei/create",
  getDeviceDetail:"Imei/get",
}
const downloadDetailsExcel={
  downloadAdmin:"download/downloadAmin",
  downloadDelear:"download/downloadDelear",
  dowonloadUser:"download/downloadUser",
 downloadDevices:"download/downloadDevices",
 deviceTypes:"download/downloaddeviceTypes",
 downloadInventry:"download/downloadInventry",
}
const APIName = {
  ...BillboardAPI,
  ...Users,
  ...adminauthAPI,
  ...subscribers,
  ...vehicleType,
  ...device,
  ...dashboard,
  ...splash,
  ...setting,
  ...aboutUs,
  ...privacyPolicy,
  ...FaQList,
  ...FaQPriority,
  ...Admin,
  ...getmanageSetting,
  ...mapdetails,
  ...Notification,
  ...suport,
  ...deviceType,
  ...deviceDetails,
  ...TermAndCondition,
  ...downloadDetailsExcel,
  ...ReportsUser
};

export default APIName;
