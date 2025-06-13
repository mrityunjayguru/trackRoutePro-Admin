import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDeviceType,setsingleDeviceType} from "../../../store/deviceType";
import APIName from "../../endPoints";
import { NotificationRepo } from "./NotificationRepo";
import Swal from "sweetalert2";
import { setSalesAppNotification } from "../../../store/salesApp/addOns";

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
export const addSlesAppNotification = createAsyncThunk<boolean, Payload>(
  APIName.subscribers,
  async (payload, thunkAPI) => {
    try {
      const data = await NotificationRepo.addNotification(payload);
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



export const getSalesAppnotification = createAsyncThunk<boolean, Payload>(
  APIName.updateSubscriber,
  async (payload, thunkAPI) => {
    try {
      const data = await NotificationRepo.getNotification(payload);
    
      if (data.status === 200) {
      
        thunkAPI.dispatch(setSalesAppNotification(data.data.data));
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
