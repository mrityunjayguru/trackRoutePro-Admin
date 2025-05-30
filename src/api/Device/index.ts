import { createAsyncThunk } from "@reduxjs/toolkit";
import {deviceImei, setAllSubscriber,dealearCode,singleSubscriber,singleDevices,ExPDevices,userDevices,setFormData,setBlank ,handleFormData,renewRequest} from "../../store/subscriber";
import APIName from "../endPoints";
import { userRepo } from "./deviceRepo";
import Swal from "sweetalert2";

interface Payload {
  // Define your payload structure here, for example:
  someField: string; // replace this with actual fields
}
const GetMessage = (type:any, messga:string) => {
  Swal.fire({
    icon: type,
    title: messga,
    showConfirmButton: false,
    timer: 2000,
  });
};
export const Getsubscribers = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.Getsubscribers(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setAllSubscriber(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("warning", "something went wrong");
      }
      console.error(err);
    }
    return false;
  }
);
export const GetDealearRecord = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.getDealearRecord(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(dealearCode(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("warning", "something went wrong");
      }
      console.error(err);
    }
    return false;
  }
);
export const singleSubscribers = createAsyncThunk<boolean, Payload>(
  APIName.updateBillboard,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(singleSubscriber(payload));

      
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("warning", "something went wrong");
      }
    }
    return false;
  }
);

export const editSubscriber = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.updatedevices(payload);
      if (data.status === 200) {
        GetMessage("success","Records Updated")
        thunkAPI.dispatch(singleSubscriber(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("warning", "something went wrong");
      }
      console.error(err);
    }
    return false;
  }
);

export const addDevice = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload:any) => {
    try {
      // If isWired is false, remove Ac and imobilizer from displayParameters
      if (payload.isWired=="false" && payload.displayParameters) {
        const { AC, Relay,Door,Charging,Engine,extBattery, ...filteredDisplayParameters } = payload.displayParameters;
        payload.displayParameters = filteredDisplayParameters;
      }

      const data = await userRepo.AddDevice(payload);
      if (data.status === 200) {
        GetMessage("success", "Devices Created");
        return true;
      }
    } catch (err: any) {
      if (err.status == 401) {
        localStorage.removeItem("token");
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin";
      }
      if (err.status == 400) {
        console.error(err.response.data.message);
        GetMessage("error", err.response.data.message);
      }
      if (err.response?.data?.error?.status == 404) {
        GetMessage("error", "Invalid IMEI Number");
      }
    }
    return false;
  }
);

export const manageSingleDevices = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(singleDevices(payload));
        return true;
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("error","something went wrong")

      }
    }
    return false;
  }
);


export const updateDevices = createAsyncThunk<boolean, Payload>(
  APIName.updateDevices,
  async (payload:any, thunkAPI) => {
    if (payload.isWired=="false" && payload.displayParameters) {
      const { AC, Relay,Door,Charging,Engine,extBattery, ...filteredDisplayParameters } = payload.displayParameters;
      payload.displayParameters = filteredDisplayParameters;
    }
    try {
      const data = await userRepo.updatedevices(payload);
      if (data.status === 200) {
        GetMessage("success","success")
        thunkAPI.dispatch(singleDevices(data.data.data));
        return true;
      }
    } catch (err:any) {
      console.log(err,"errerr")
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
      if(err.response?.data?.error?.status==404){
        GetMessage("error","Invalid Imei Or DeviceId")
      }
      else{
      // console.error(err.response.data.message);
        GetMessage("error",err.response.data.message)
      }
    }
    return false;
  }
);

export const getExPDevices = createAsyncThunk<boolean, Payload>(
  APIName.updateDevices,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.expDevices(payload);
      if (data.status === 200) {
      
        thunkAPI.dispatch(ExPDevices(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("error","something went wrong")

      }
      if(err.status==500){
      // console.error(err.response.data.message);
        GetMessage("error",err.response.data.message)
      }
    }
    return false;
  }
);

export const updateMany = createAsyncThunk<boolean, Payload>(
  APIName.updateMany,
  async (payload) => {
    try {
      const data = await userRepo.updateMany(payload);
      if (data.status === 200) {
        GetMessage("success","success")
      
        // thunkAPI.dispatch(ExPDevices(data.data.data));
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("error","something went wrong")

      }
      if(err.status==500){
      // console.error(err.response.data.message);
        GetMessage("error",err.response.data.message)
      }
    }
    return false;
  }
);



export const DeviceByOwnerId = createAsyncThunk<any, Payload>(
  APIName.updateDevices,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.deviceOwnerID(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(userDevices(data.data.data));
        return data;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("error","something went wrong")

      }
      if(err.status==500){
      // console.error(err.response.data.message);
        GetMessage("error",err.response.data.message)
      }
    }
    return false;
  }
);



export const HandleFormData = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setFormData(payload));
        return true;

    } catch (err:any) {
      console.error(err);
    }
    return false;
  }
);
export const setBlankArray = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setBlank(payload));
        return true;

    } catch (err:any) {
      console.error(err);
    }
    return false;
  }
);

export const storeFormData = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(handleFormData(payload));
        return true;

    } catch (err:any) {
      console.error(err);
    }
    return false;
  }
);

export const getRenewRequest = createAsyncThunk<any, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.getRenewRequest(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(renewRequest(data.data.data));
        return data;
      }
    } catch (err:any) {
      console.error(err);
    }
    return false;
  }
);

export const setUserImei = createAsyncThunk<any, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(deviceImei(payload));
        return payload;
    } catch (err:any) {
      console.error(err);
    }
    return false;
  }
);