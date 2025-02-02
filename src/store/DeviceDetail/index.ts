import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
  deviceDetail: any; // Store login user data
  userTableData: any; // Store user table data
  singleDeviceDetail:any
  singleDevice:any
  groupaboutus:any
}

// Initial state for the slice
const initialState: UserDataState = {
  deviceDetail: null,
  userTableData: null,
  singleDeviceDetail:null,
  singleDevice:null,
  groupaboutus:null
};

// Create the user data slice
export const deviceDetailSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setDeviceDetail: (state, action: PayloadAction<any>) => {
      state.deviceDetail = action.payload; // Set login user data
    },
    singleDeviceDetail: (state, action: PayloadAction<any>) => {
        state.singleDeviceDetail = action.payload; // Set user table data
      },
  },
});

// Export actions
export const {setDeviceDetail,singleDeviceDetail} = deviceDetailSlice.actions;

// Export reducer
export default deviceDetailSlice.reducer;
