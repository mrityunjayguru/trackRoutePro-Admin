import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeviceState {
slesTeame:any,
singleslesTeame:any,
updateSalesTeam:any,
performance:any,
performancedata:any,
leave:any,
dashboard:any,
userSales:any
}
const initialState: DeviceState = {
  slesTeame: null,
  singleslesTeame:null,
  updateSalesTeam:null,
  performance:null,
  performancedata:null,
  leave:null,
  dashboard:null,
  userSales:null
};
export const slesTeameSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setslesTeame: (state: { slesTeame: any; }, action: PayloadAction<any>) => {
      state.slesTeame = action.payload; // Set login user data
    },
    setsingleslesTeame: (state: { singleslesTeame: any; }, action: PayloadAction<any>) => {
      state.singleslesTeame = action.payload; // Set login user data
    },
        setUpdateSealTeam: (state: { updateSalesTeam: any; }, action: PayloadAction<any>) => {
      state.updateSalesTeam = action.payload; // Set login user data
    },
    setUpdatePerformancre: (state: { performance: any; }, action: PayloadAction<any>) => {
      state.performance = action.payload; // Set login user data
    },
    performanceRecord: (state: { performancedata: any; }, action: PayloadAction<any>) => {
      state.performancedata = action.payload; // Set login user data
    },
    setLeave: (state: { leave: any; }, action: PayloadAction<any>) => {
      state.leave = action.payload; // Set login user data
    },
       setDashboard: (state: { dashboard: any; }, action: PayloadAction<any>) => {
      state.dashboard = action.payload; // Set login user data
    },
    setUsersales: (state: { userSales: any; }, action: PayloadAction<any>) => {
      state.userSales = action.payload; // Set login user data
    },
  },
});
export const {setslesTeame,setUsersales,setDashboard,setsingleslesTeame ,setUpdateSealTeam,setUpdatePerformancre,performanceRecord,setLeave} = slesTeameSlice.actions;

export default slesTeameSlice.reducer;
