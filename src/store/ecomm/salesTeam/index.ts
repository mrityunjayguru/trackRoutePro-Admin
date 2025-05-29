import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeviceState {
slesTeame:any,
singleslesTeame:any
}
const initialState: DeviceState = {
  slesTeame: null,
  singleslesTeame:null
};
export const slesTeameSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setslesTeame: (state, action: PayloadAction<any>) => {
      state.slesTeame = action.payload; // Set login user data
    },
    setsingleslesTeame: (state, action: PayloadAction<any>) => {
      state.singleslesTeame = action.payload; // Set login user data
    },
  },
});
export const {setslesTeame,setsingleslesTeame } = slesTeameSlice.actions;

export default slesTeameSlice.reducer;
