import { createAsyncThunk } from "@reduxjs/toolkit";
import { setslesTeame,setDashboard,setsingleslesTeame,setUpdateSealTeam,setUpdatePerformancre,performanceRecord,setLeave} from "../../../store/ecomm/salesTeam";
import APIName from "../../endPoints";
import { salesTeamRepo } from "./salesRepo";
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
export const addSalesTeam = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await salesTeamRepo.addsalesTeam(payload);
      if (data.status === 200) {
        GetMessage("success","Records created")
       
        return true;
      }
    } catch (err:any) {
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
      if(err.status==400){
        GetMessage("warning", err?.response?.data?.message);
      }
      else{
        GetMessage("warning", "something went wrong");
      }
      console.error(err);
    }
    return false;
  }
);


export const getSalesTeam = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await salesTeamRepo.getsalesTeam(payload);
    
      if (data.status === 200) {
        thunkAPI.dispatch(setslesTeame(data.data.data));
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


export const updateSalesTeams = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await salesTeamRepo.updatesalesTeam(payload);
      if (data.status === 200) {
        GetMessage("success","Records Updated")
        // thunkAPI.dispatch(setslesTeame(data.data.data));
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

export const singlesalesupdatesalesTeam = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload,thunkAPI) => {
    try {
        thunkAPI.dispatch(setsingleslesTeame(payload));
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


export const updatesalesTeam = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await salesTeamRepo.updatesalesTeam(payload);
      console.log(data,"datadatadatadatadatadatadatadata")
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


export const setupdatesalesTeam = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdateSealTeam(payload));
     
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
export const handlePerformence = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setUpdatePerformancre(payload));
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


export const performanceData = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await salesTeamRepo.performance(payload);
    
      if (data.status === 200) {
      
        thunkAPI.dispatch(performanceRecord(data.data.data));
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


export const getLeave = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await salesTeamRepo.getleave(payload);
    
      if (data.status === 200) {
      
        thunkAPI.dispatch(setLeave(data.data.data));
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


export const updateLeaveStatus = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await salesTeamRepo.updateLeaveStatus(payload);
    
      if (data.status === 200) {
      
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

export const salesTeamDashboard = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await salesTeamRepo.salesTeamDashboard(payload);
    
      if (data.status === 200) {
        thunkAPI.dispatch(setDashboard(data.data.data));
      
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