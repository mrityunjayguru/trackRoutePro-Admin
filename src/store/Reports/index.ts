import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReportDataState {
  UserReportData: any; 
  RootHistory:any;
  singleRecordsImei:any;
  reportType:any;
  traivelSummary:any;
}
const initialState: ReportDataState = {
  UserReportData: null,
  RootHistory: null,
  singleRecordsImei:null,
  reportType:null,
  traivelSummary:null
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
    singleRecords: (state, action: PayloadAction<any>) => {
      state.singleRecordsImei = action.payload; 
    },
    reportType: (state, action: PayloadAction<any>) => {
      state.reportType = action.payload; 
    },
    traivelSummary: (state, action: PayloadAction<any>) => {
      state.traivelSummary = action.payload; 
    },
    clearReportData: (state) => {
      state.UserReportData = null; // Clear login user data
    },

   
  },
});

// Export actions
export const {setUserReportData,RootHistory,singleRecords,reportType,traivelSummary} = settingSlice.actions;

// Export reducer
export default settingSlice.reducer;
