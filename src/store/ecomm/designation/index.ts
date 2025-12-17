import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface designationState {
  designation: any,
  singledesignation: any,
  TSL: any,
  SSM: any
}
const initialState: designationState = {
  designation: null,
  singledesignation: null,
  TSL: null,
  SSM: null
};
export const designationSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setdesignation: (state, action: PayloadAction<any>) => {
      state.designation = action.payload; // Set login user data
    },
    setsingledesignation: (state, action: PayloadAction<any>) => {
      state.singledesignation = action.payload; // Set login user data
    },
    setTSL: (state, action: PayloadAction<any>) => {
      state.TSL = action.payload; // Set login user data
    },
    setSSM: (state, action: PayloadAction<any>) => {
      state.SSM = action.payload; // Set login user data
    },
  },
});
export const { setdesignation, setsingledesignation ,setTSL,setSSM} = designationSlice.actions;

export default designationSlice.reducer;
