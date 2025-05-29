import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeviceState {
slesTeame:any,
singleslesTeame:any,
updateSalesTeam:any
}
const initialState: DeviceState = {
  slesTeame: null,
  singleslesTeame:null,
  updateSalesTeam:null
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
        setUpdateSealTeam: (state, action: PayloadAction<any>) => {
      state.updateSalesTeam = action.payload; // Set login user data
    },
  },
});
export const {setslesTeame,setsingleslesTeame ,setUpdateSealTeam} = slesTeameSlice.actions;

export default slesTeameSlice.reducer;
