import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface gpsDevicesState {
gpsDevices:any,
singlegpsDevices:any,
updateDevice:any,
category:any,
categoryresult:any,
subcategoryresult:any,
updateCategorypayload:any,
updatesubCategorypayload:any
}
const initialState: gpsDevicesState = {
  gpsDevices: null,
  singlegpsDevices:null,
  updateDevice:null,
  category:null,
  categoryresult:null,
  subcategoryresult:null,
  updateCategorypayload:null,
  updatesubCategorypayload:null
};
export const gpsDevicesSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setgpsDevices: (state, action: PayloadAction<any>) => {
      state.gpsDevices = action.payload; // Set login user data
    },
    setsinglegpsDevices: (state, action: PayloadAction<any>) => {
      state.singlegpsDevices = action.payload; // Set login user data
    },
    setUpdategpsDevices: (state, action: PayloadAction<any>) => {
      state.updateDevice = action.payload; // Set login user data
    },
      setCategory: (state, action: PayloadAction<any>) => {
      state.category = action.payload; // Set login user data
    },
    setcategoruResult: (state, action: PayloadAction<any>) => {
      state.categoryresult = action.payload; // Set login user data
    },
    setgpscategoruResult: (state, action: PayloadAction<any>) => {
      state.subcategoryresult = action.payload; // Set login user data
    },
    setupdateCategory: (state, action: PayloadAction<any>) => {
      state.updateCategorypayload = action.payload; // Set login user data
    },
      setupdatesubCategory: (state, action: PayloadAction<any>) => {
      state.updatesubCategorypayload = action.payload; // Set login user data
    },
  },
});
export const {setgpsDevices,setsinglegpsDevices,setUpdategpsDevices,setCategory,setcategoruResult,setgpscategoruResult,setupdateCategory,setupdatesubCategory } = gpsDevicesSlice.actions;

export default gpsDevicesSlice.reducer;
