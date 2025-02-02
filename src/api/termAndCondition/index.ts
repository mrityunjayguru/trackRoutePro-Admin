import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllprivacyandPolicy } from "../../store/PrivacyandPolicy";
import APIName from "../endPoints";
// import { TermAndConditionRepo } from "./TermAndCondition";
import {termAndConditionRepo} from "./TermAndCondition"
import Swal from "sweetalert2";

interface Payload {
  someField: string; // replace this with actual fields
}
const GetMessage = (type:any, messga:any) => {
  Swal.fire({
    icon: type,
    title: messga,
    showConfirmButton: false,
    timer: 2000,
  });
};
export const getTermAndCondition = createAsyncThunk<boolean, Payload>(
  APIName.getTermAndCondition,
  async (payload, thunkAPI) => {
    try {
      const data = await termAndConditionRepo.gettermAndCondition(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setAllprivacyandPolicy(data.data.data));
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
    }
    return false;
  }
);

export const singleSubscribers = createAsyncThunk<boolean, Payload>(
  APIName.updateBillboard,
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(getTermAndCondition(payload));

      
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

export const updateTermAndConditions = createAsyncThunk<boolean, Payload>(
  APIName.updateTermAndCondition,
  async (payload) => {
    try {
      const data = await termAndConditionRepo.updatetermAndCondition(payload);
      if (data.status === 200) {
        GetMessage("success","Records Updated")
        // thunkAPI.dispatch(getTermAndCondition(data.data.data));
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
    }
    return false;
  }
);

export const createTermAndConditions = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload) => {
    try {
      const data = await termAndConditionRepo.createtermAndCondition(payload);
      if (data.status === 200) {
        GetMessage("success","success")
        return true;
      }
    } catch (err:any) {
      GetMessage("error","something went wrong")
    
    }
    return false;
  }
);
export const manageSingleDevices = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(getTermAndCondition(payload));
        return true;
    } catch (err:any) {
     
    }
    return false;
  }
);


export const updateDevices = createAsyncThunk<boolean, Payload>(
  APIName.updateDevices,
  async (payload, thunkAPI) => {
    try {
      const data = await termAndConditionRepo.updatetermAndCondition(payload);
      if (data.status === 200) {
        GetMessage("success","Devices Updated")
        thunkAPI.dispatch(getTermAndCondition(data.data.data));
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