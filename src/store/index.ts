import { combineReducers } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
import authDataSlice from "./Auth/index";
import subscriber from "./subscriber/index"
import vehicletype from "./VehicleTypes/index"
import dashboard from "./Dashboard/index"
import setting from "./setting/index"
// Combine the individual slices
import splash from "./splash/index"
import PrivacyAndPolicy from "./PrivacyandPolicy/index"
import aboutus from "./aboutus/index"
import FaqList from "./FaQList/index"
import FaQPriority from "./FaQPriority/index"
import admin from "./Admin/index"
import managesetting from "./manageSetting/index"
import managemap from "./manageMap/index"
import notification from "./Notification/index"
import suport from "./suport/index"
import DeviceTye from "./deviceType/index"
import deviceDetail from "./DeviceDetail/index"
import userReport from "./Reports/index"
import gpsDevices from "./ecomm/gpsDevices/index";
import designation from "./ecomm/designation/index"
import slesTeame from "./ecomm/salesTeam/index"
import addOns from "./ecomm/addOns/index"
import coupon from "./ecomm/coupon/index"
import relaySecurity from "./ecomm/relaySecurity/index"
import salesAppNotification from "./salesApp/addOns/index"

const appReducer = combineReducers({
  userData: userDataSlice,
  Auth: authDataSlice,
  subscriber:subscriber,
  vehicletype:vehicletype,
  dashboard:dashboard,
  splash:splash,
  setting:setting,
  PrivacyAndPolicy:PrivacyAndPolicy,
  aboutus:aboutus,
  FaqList:FaqList,
  FaQPriority:FaQPriority,
  adminRole:admin,
  managesetting:managesetting,
  map:managemap,
  notification:notification,
  suport:suport,
  DeviceTye:DeviceTye,
  deviceDetail:deviceDetail,
  userReport:userReport,
  gpsDevices:gpsDevices,
  designation:designation,
  slesTeame:slesTeame,
  addOns:addOns,
  coupon:coupon,
  relaySecurity:relaySecurity,
  salesAppNotification:salesAppNotification
});

// Create a root reducer with reset functionality
const rootReducer = (state: any, action: any) => {
  if (action.type === "RESSET_STORE") {
    // Reset the state to initial state
    state = undefined; // Setting state to undefined resets the store
    sessionStorage.removeItem("token"); // Remove the token from session storage
    localStorage.clear(); // Clear all data in local storage
  }
  return appReducer(state, action); // Return the updated state
};

export default rootReducer;
