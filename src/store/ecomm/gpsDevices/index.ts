import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface gpsDevicesState {
gpsDevices:any,
singlegpsDevices:any
}
const initialState: gpsDevicesState = {
  gpsDevices: null,
  singlegpsDevices:null
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
  },
});
export const {setgpsDevices,setsinglegpsDevices } = gpsDevicesSlice.actions;

export default gpsDevicesSlice.reducer;
