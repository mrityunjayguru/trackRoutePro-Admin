import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface orderState {
order:any,
singleorder:any
}
const initialState: orderState = {
  order: null,
  singleorder:null
};
export const orderSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setorder: (state, action: PayloadAction<any>) => {
      state.order = action.payload; // Set login user data
    },
    setsingleorder: (state, action: PayloadAction<any>) => {
      state.singleorder = action.payload; // Set login user data
    },
  },
});
export const {setorder,setsingleorder } = orderSlice.actions;

export default orderSlice.reducer;
