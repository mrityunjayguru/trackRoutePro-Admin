import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface AuthRepo {
  register: (payload: Payload) => Promise<AxiosResponse>;
  updateProfile: (payload: Payload) => Promise<AxiosResponse>;
  adminLogin: (payload: Payload) => Promise<AxiosResponse>;
  adminRegister: (payload: Payload) => Promise<AxiosResponse>;
  allUsers: (payload: Payload) => Promise<AxiosResponse>;
  updatePassowrdWithOld: (payload: Payload) => Promise<AxiosResponse>;
  sendOtp: (payload: Payload) => Promise<AxiosResponse>;
  resetpassword: (payload: Payload) => Promise<AxiosResponse>;
  handlelogout: (payload: Payload) => Promise<AxiosResponse>;
verifyOtp: (payload: Payload) => Promise<AxiosResponse>;

  


}

export const AuthRepo: AuthRepo = {
  register(payload: Payload) {
    return Repository.post(APIName.register, payload);
  },
  updateProfile(payload: Payload) {
    return Repository.post(APIName.updateprofile, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  adminLogin(payload: Payload) {
    return Repository.post(APIName.login, payload);
  },
  adminRegister(payload: Payload) {
    return Repository.post(APIName.register, payload);
  },
  allUsers(payload: Payload) {
    return Repository.post(APIName.alluser, payload);
  },
  updatePassowrdWithOld(payload: Payload) {
    return Repository.post(APIName.updatePassword, payload);
  },
  sendOtp(payload: Payload) {
    return Repository.post(APIName.sendotp, payload);
  },
  resetpassword(payload: Payload) {
    return Repository.post(APIName.resetpassword, payload);
  },
  handlelogout(payload: Payload) {
    return Repository.post(APIName.logout, payload);
  },
  verifyOtp(payload: Payload) {
    return Repository.post(APIName.verifyOtp, payload);
  },
};
