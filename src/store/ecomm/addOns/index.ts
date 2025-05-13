import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeviceState {
addOns:any,
singleaddOns:any
}
const initialState: DeviceState = {
  addOns: null,
  singleaddOns:null
};
export const addOnsSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setaddOns: (state, action: PayloadAction<any>) => {
      state.addOns = action.payload; // Set login user data
    },
    setsingleaddOns: (state, action: PayloadAction<any>) => {
      state.singleaddOns = action.payload; // Set login user data
    },
  },
});
export const {setaddOns,setsingleaddOns } = addOnsSlice.actions;

export default addOnsSlice.reducer;
