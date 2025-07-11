import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
  dashboard: any; 
  dashboardoverview:any;
  setOther:any
}

// Initial state for the slice
const initialState: UserDataState = {
  dashboard: null,
  dashboardoverview:null,
  setOther:null
};

// Create the user data slice
export const dashboardSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setdashboard: (state, action: PayloadAction<any>) => {
      state.dashboard = action.payload; // Set login user data
    },
    setdashboardoverview: (state, action: PayloadAction<any>) => {
      state.dashboardoverview = action.payload; // Set login user data
    },
    setOtherdashboard: (state, action: PayloadAction<any>) => {
      state.setOther = action.payload; // Set login user data
    },
  },
});

// Export actions
export const {setdashboard,setdashboardoverview,setOtherdashboard } = dashboardSlice.actions;

// Export reducer
export default dashboardSlice.reducer;
