import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface relaySecurityState {
relaySecurity:any,
invoices:any
}
const initialState: relaySecurityState = {
  relaySecurity: null,
  invoices:null
};
export const relaySecuritySlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setrelaySecurity: (state, action: PayloadAction<any>) => {
      state.relaySecurity = action.payload; // Set login user data
    },
    setsinglerelaySecurity: (state, action: PayloadAction<any>) => {
      state.invoices = action.payload; // Set login user data
    },
  },
});
export const {setrelaySecurity,setsinglerelaySecurity } = relaySecuritySlice.actions;

export default relaySecuritySlice.reducer;
