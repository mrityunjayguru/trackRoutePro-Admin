import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
NotificationData:any,
singleaddOns:any
}
const initialState: NotificationState = {
  NotificationData: null,
  singleaddOns:null
};
export const addOnsSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setSalesAppNotification: (state: { NotificationData: any; }, action: PayloadAction<any>) => {
      state.NotificationData = action.payload; // Set login user data
    },
    setsingleaddOns: (state: { singleaddOns: any; }, action: PayloadAction<any>) => {
      state.singleaddOns = action.payload; // Set login user data
    },
  },
});
export const {setSalesAppNotification } = addOnsSlice.actions;

export default addOnsSlice.reducer;
