import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface designationState {
designation:any,
singledesignation:any
}
const initialState: designationState = {
  designation: null,
  singledesignation:null
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
  },
});
export const {setdesignation,setsingledesignation } = designationSlice.actions;

export default designationSlice.reducer;
