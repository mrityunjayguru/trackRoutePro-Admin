import { createAsyncThunk } from "@reduxjs/toolkit";
import { setdesignation,setsingledesignation,setTSL,setSSM} from "../../../store/ecomm/designation";
import APIName from "../../endPoints";
import { designationRepo } from "./designationRepo";
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
export const adddesignation = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await designationRepo.adddesignation(payload);
      if (data.status === 200) {
        GetMessage("success","Records created")
       
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



export const getdesignation = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await designationRepo.getdesignation(payload);
    
      if (data.status === 200) {
      
        thunkAPI.dispatch(setdesignation(data.data.data));
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

export const singledesignation = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload,thunkAPI) => {
    try {
        thunkAPI.dispatch(setsingledesignation(payload));
        return true;
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
      if(err.status==400){
        console.error(err.response.data.message);
          GetMessage("error",err.response.data.message)
        }
      else{
        GetMessage("error","something went wrong")

      }
    
    }
    return false;
  }
);


export const updatedesignation = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await designationRepo.updatedesignation(payload);
      if (data.status === 200) {
        GetMessage("success","Records updated")
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
)



export const getSSM = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await designationRepo.SSM(payload);
    
      if (data.status === 200) {
      
        thunkAPI.dispatch(setSSM(data.data.data));
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


export const getTSL = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await designationRepo.TSL(payload);
    
      if (data.status === 200) {
      
        thunkAPI.dispatch(setTSL(data.data.data));
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