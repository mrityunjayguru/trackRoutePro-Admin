import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReportDataState {
  UserReportData: any; 
  RootHistory:any;
  singleRecordsImei:any;
  reportType:any;
  traivelSummary:any;
  distanceRecord:any;
}
const initialState: ReportDataState = {
  UserReportData: null,
  RootHistory: [],
  singleRecordsImei:null,
  reportType:null,
  traivelSummary:null,
  distanceRecord:null
};
// Create the user data slice
export const settingSlice = createSlice({
  name: 'ReportData',
  initialState,
  reducers: {
    setUserReportData: (state, action: PayloadAction<any>) => {
      state.UserReportData = action.payload; 
    },
    RootHistory: (state, action: PayloadAction<any>) => {
      state.RootHistory = action.payload; 
    },
    RootHistorysetBlanks: (state, action: PayloadAction<any>) => {
      state.RootHistory = []; 
    },
    singleRecords: (state, action: PayloadAction<any>) => {
      state.singleRecordsImei = action.payload; 
    },
    reportType: (state, action: PayloadAction<any>) => {
      state.reportType = action.payload; 
    },
    traivelSummary: (state, action: PayloadAction<any>) => {
      state.traivelSummary = action.payload; 
    },
    setDistanceRecod: (state, action: PayloadAction<any>) => {
      state.distanceRecord = action.payload; 
    },
    clearReportData: (state) => {
      state.UserReportData = null; // Clear login user data
    },

   
  },
});

// Export actions
export const {setUserReportData,RootHistory,singleRecords,reportType,traivelSummary,RootHistorysetBlanks,setDistanceRecod} = settingSlice.actions;

// Export reducer
export default settingSlice.reducer;
