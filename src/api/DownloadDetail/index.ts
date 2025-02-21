import { createAsyncThunk } from "@reduxjs/toolkit";
import APIName from "../endPoints";
// import { DownloadRepo } from "./DownloadRepo";
import { DownloadRepoRepo } from "./DownloadRepo";
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
export const dowonloadUser = createAsyncThunk<any, Payload>(
  APIName.dowonloadUser,
  async (payload, thunkAPI) => {
    try {
      const data = await DownloadRepoRepo.dowonloadUser(payload);
      if (data.status === 200) {
        return data;
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
export const downloadDelear = createAsyncThunk<any, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await DownloadRepoRepo.downloadDelear(payload);
      if (data.status === 200) {
        return data;
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
export const downloadAdmin = createAsyncThunk<any, Payload>(
  APIName.updateBillboard,
  async (payload, thunkAPI) => {
    try {
      const data = await DownloadRepoRepo.downloadAdmin(payload);
      if (data.status === 200) {
        return data;
      }
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


export const downloadDevices = createAsyncThunk<any, Payload>(
  APIName.downloadDevices,
  async (payload, thunkAPI) => {
    try {
      const data = await DownloadRepoRepo.downloadDevices(payload);
      if (data.status === 200) {
        return data;
      }
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

export const deviceTypes = createAsyncThunk<any, Payload>(
  APIName.downloadDevices,
  async (payload, thunkAPI) => {
    try {
      const data = await DownloadRepoRepo.deviceTypes(payload);
      if (data.status === 200) {
        return data;
      }
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

export const downloadInventry = createAsyncThunk<any, Payload>(
  APIName.downloadDevices,
  async (payload, thunkAPI) => {
    try {
      const data = await DownloadRepoRepo.downloadInventry(payload);
      if (data.status === 200) {
        return data;
      }
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