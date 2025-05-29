import { createAsyncThunk } from "@reduxjs/toolkit";
import { setgpsDevices,setsinglegpsDevices,setUpdategpsDevices,setCategory,setcategoruResult,setgpscategoruResult,setupdateCategory,setupdatesubCategory} from "../../../store/ecomm/gpsDevices";
import APIName from "../../endPoints";
import { gpsDevicesRepo } from "./gpsDevicesRepo";
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
export const addgpsDevices = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await gpsDevicesRepo.addgpsDevices(payload);
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



export const getGpsDevices = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await gpsDevicesRepo.getgpsDevices(payload);
    
      if (data.status === 200) {
      
        thunkAPI.dispatch(setgpsDevices(data.data.data));
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

export const singlegpsDeaddgpsDevices = createAsyncThunk<boolean, Payload>(
  APIName.createDevice,
  async (payload,thunkAPI) => {
    try {
        thunkAPI.dispatch(setsinglegpsDevices(payload));
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


export const updateGpsDevices = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await gpsDevicesRepo.updategpsDevices(payload);
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



export const setUpdateGpsDevices = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
       thunkAPI.dispatch(setUpdategpsDevices(payload));

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




export const gpscategory = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await gpsDevicesRepo.gpscategory(payload);
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

export const gpssubcategory = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await gpsDevicesRepo.gpssubcategory(payload);
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




export const getCategorys = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await gpsDevicesRepo.getCategory(payload);
    
      if (data.status === 200) {
        thunkAPI.dispatch(setCategory(data.data.data));
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


export const getcategoryResult = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await gpsDevicesRepo.categoruResult(payload);
    
      if (data.status === 200) {
        thunkAPI.dispatch(setcategoruResult(data.data.data));
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



export const getGpsSubcaegory = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await gpsDevicesRepo.getGpsSubcaegory(payload);
    
      if (data.status === 200) {
        thunkAPI.dispatch(setgpscategoruResult(data.data.data));
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



export const updateCategory = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setupdateCategory(payload));
        return true;
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
export const updatesubCategory = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(setupdatesubCategory(payload));
        return true;
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
export const handleupdateCategory = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
    const data = await gpsDevicesRepo.updatecategory(payload);
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
);

export const updateGpssubcategory = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
    const data = await gpsDevicesRepo.updatesubcategory(payload);
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
);