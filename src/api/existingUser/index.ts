import { createAsyncThunk } from "@reduxjs/toolkit";
import APIName from "../endPoints";
import { existingUser } from "./existingUser";
import Swal from "sweetalert2";
import { singleSubscriber } from "../../store/subscriber";
interface Payload {
  someField: any; // replace this with actual fields
}

export const checkExistingUser = createAsyncThunk<boolean, Payload>(
  APIName.alluser,
  async (payload, thunkAPI) => {
    try {
      const response = await existingUser.checkExistingUser(payload);
      if (response.status === 200) {
     thunkAPI.dispatch(singleSubscriber(response.data.data))
        return response.data;
      }
    } catch (err: any) {
      console.error(err);
    }
    return false;
  }
);
export const setBlankcheckExistingUser = createAsyncThunk<boolean, Payload>(
  APIName.alluser,
  async (payload, thunkAPI) => {
    try {
     thunkAPI.dispatch(singleSubscriber(payload))
        return true;
    } catch (err: any) {
      console.error(err);
    }
    return false;
  }
);
const showMessage = (type: "success" | "error", message: string) => {
  Swal.fire({
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2000,
  });
};
