import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAdmin,setSingleAdmin } from '../../store/Admin';
import APIName from '../endPoints';
import { ReportsRepo } from './ReportsRepo';
import Swal from 'sweetalert2';
import { setUserReportData,RootHistory,singleRecords,reportType,traivelSummary,RootHistorysetBlanks,setDistanceRecod } from '../../store/Reports';

interface Payload {
  someField: string; // replace this with actual fields
}
const GetMessage = (type: any, messga: string) => {
  Swal.fire({
    icon: type,
    title: messga,
    showConfirmButton: false,
    timer: 2000,
  });
};
export const UsersReportData = createAsyncThunk<boolean, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI)=> {
    try {
      const data = await ReportsRepo.ReportsUser(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(setUserReportData(data.data.data));
        return true;
      }
    } catch (err: any) {
      if (err.status == 400) {
        GetMessage("error", err.response.data.message)
      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
      if(err.status==400){
        GetMessage("warning", "Mobile No Already Exists");
      }
      else{
        GetMessage("error","something went wrong")

      }
    }
    return false;
  },
);

export const SingleRecords = createAsyncThunk<boolean, Payload>(
  APIName.addadmin,
  async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(singleRecords(payload));
        return true;
    } catch (err: any) {
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("error","something went wrong")
      }
    }
    return false;
  },
);


export const singleAdmin = createAsyncThunk<boolean, Payload>(
  APIName.addadmin,
  async (payload, thunkAPI) => {
    try {
      // const data = await ReportsRepo.AllAdmin(payload);
  
        thunkAPI.dispatch(setSingleAdmin(payload));
        return true;
    } catch (err: any) {
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }else{
        GetMessage("error","something went wrong")

      }
    }
    return false;
  },
);




export const RootHistorys = createAsyncThunk<boolean, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI) => {
    try {
      const data = await ReportsRepo.RootHistory(payload);
      if (data.status === 200) {
        
        thunkAPI.dispatch(RootHistory(data.data.data));
      }
        return true;
    } catch (err: any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")
      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);

export const SummaryType = createAsyncThunk<boolean, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI) => {
    try {
      thunkAPI.dispatch(reportType(payload));
        return true;
    } catch (err: any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")
      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);


export const summaryReports = createAsyncThunk<any, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI) => {
    try {
      const data = await ReportsRepo.summaryReports(payload);
      if (data.status === 200) {
        
        thunkAPI.dispatch(traivelSummary(data.data.data));
      }
        return data;
    } catch (err: any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")
      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);



export const traivelReport = createAsyncThunk<any, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI) => {
    try {
      const data = await ReportsRepo.traivelReport(payload);
      if (data.status === 200) {
        
        thunkAPI.dispatch(traivelSummary(data.data.data));
      }
        return data;
    } catch (err: any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")
      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);


export const tripSummary = createAsyncThunk<any, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI) => {
    try {
      const data = await ReportsRepo.tripSummary(payload);
      if (data.status === 200) {
        
        thunkAPI.dispatch(traivelSummary(data.data.data));
      }
        return data;
    } catch (err: any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")
      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);

export const eventReports = createAsyncThunk<any, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI) => {
    try {
      const data = await ReportsRepo.eventReports(payload);
      if (data.status === 200) {
        
        thunkAPI.dispatch(traivelSummary(data.data.data));
      }
        return data;
    } catch (err: any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")
      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);

export const distanceReport = createAsyncThunk<any, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI) => {
    try {
      const data = await ReportsRepo.distanceReport(payload);
      if (data.status === 200) {
        
        thunkAPI.dispatch(traivelSummary(data.data.data));
        console.log(data.data.distanceRecord,"data.data.distanceRecorddata.data.distanceRecord")
        if(data.data.distanceRecord){
        thunkAPI.dispatch(setDistanceRecod(data.data.distanceRecord));

        }
      }
        return data;
    } catch (err: any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")
      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);

export const stopAndIdols = createAsyncThunk<any, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI) => {
    try {
      const data = await ReportsRepo.stopAndIdols(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(traivelSummary(data.data.data));
      }
        return data;
    } catch (err: any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")
      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);

export const AlertsReport = createAsyncThunk<any, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI) => {
    try {
      const data = await ReportsRepo.AlertsReport(payload);
      if (data.status === 200) {
        thunkAPI.dispatch(traivelSummary(data.data.data));
      }
        return data;
    } catch (err: any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")
      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);





export const setBlanckData = createAsyncThunk<any, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI) => {
    try {
      
        thunkAPI.dispatch(traivelSummary(payload));
      
    } catch (err: any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")
      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);


export const RootHistorysSetBlank = createAsyncThunk<boolean, Payload>(
  APIName.addadmin,
  async (payload,thunkAPI) => {
    try {
        
        thunkAPI.dispatch(RootHistorysetBlanks(payload));
        return true;
    } catch (err: any) {
      if(err.status==409){
        GetMessage("warning", err.response.data.message)
      }
      if (err.status == 500) {
        // console.error(err.response.data.message);
        GetMessage("error", "something went wrong")
      }
      if (err.status == 400) {
        // console.error(err.response.data.message);
        GetMessage("error", err.response.data.message)

      }
      if(err.status==401){
        localStorage.removeItem("token")
        GetMessage("warning", "Unauthorized");
        window.location.href = "/auth/signin"; 
      }
    }
    return false;
  },
);