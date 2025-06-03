import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDeviceDetail,singleDeviceDetail } from "../../store/DeviceDetail";
import APIName from "../endPoints";
import { userRepo } from "./DeviceDetailRepo";
import Swal from "sweetalert2";

interface Payload {
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
export const getDeviceDetail = createAsyncThunk<any, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.getDeviceDetails(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setDeviceDetail(data.data.data));
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  }
);



export const updateDeviceDetail = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await userRepo.updateDeviceDetail(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(singleDeviceDetail(data.data.data));
        GetMessage("success","Records Updated")
        return true;
      }
    } catch (err:any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }else{
        GetMessage("error","Something went wrong")
      }
      console.error(err);
    }
    return false;
  }
);

export const singleDeviceDetails = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      // const data = await userRepo.updateDeviceDetail(payload);
      // if (data.status === 200) {
        // GetMessage("success","Records Updated")
        thunkAPI.dispatch(singleDeviceDetail(payload));
        return true;
      // }
    } catch (err) {
      GetMessage("error","Something went wrong")
      console.error(err);
    }
    return false;
  }
);
export const createDeviceDetails = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload) => {
    try {
      const data = await userRepo.createDeviceDetail(payload);
      if (data.status === 200) {
        GetMessage("success","success")
        // thunkAPI.dispatch(singleSubscriber(data.data.data));
        return true;
      }
    } catch (err:any) {
      console.log(err.response.data.error,"errerrerr")
      if(err.status=="409"){
        GetMessage("error",err.response.data.message)
      }else{
        GetMessage("error",err.response.data.error)
      }
    
    }
    return false;
  }
);



export const createDeviceDetailWithExcel = createAsyncThunk<boolean, Payload>(
  APIName.updateDevices,
  async (payload) => {
    try {
      const data = await userRepo.createDeviceDetailwithExcel(payload);
      if (data.status === 200) {
        let msg = `Out of ${data.data.total} records, ${data.data.createdCount} were created and ${data.data.duplicateCount} were duplicates.`;
        GetMessage("success",msg)
        return true;
      }
    } catch (err:any) {
     
      if(err.status==500){
      // console.error(err.response.data.message);
        GetMessage("error",err.response.data.message)
      }
    }
    return false;
  }
);