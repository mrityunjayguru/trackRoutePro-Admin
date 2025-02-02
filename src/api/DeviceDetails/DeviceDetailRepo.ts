import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface UserRepo {
  getDeviceDetails: (payload: Payload) => Promise<AxiosResponse>;
  updateDeviceDetail: (payload: Payload) => Promise<AxiosResponse>;
  createDeviceDetail:(payload: Payload) => Promise<AxiosResponse>;
  createDeviceDetailwithExcel:(payload: Payload) => Promise<AxiosResponse>;

}

export const userRepo: UserRepo = {
  getDeviceDetails(payload) {
    return Repository.post(APIName.getDeviceDetail, payload);
  },
  updateDeviceDetail(payload) {
    return Repository.post(APIName.updateDeviceDetail, payload);
  },
   createDeviceDetail(payload) {
    return Repository.post(APIName.createDeviceDetail,payload)
  },
  createDeviceDetailwithExcel(payload) {
    return Repository.post(APIName.createDeviceDetailWithExcel, payload,{
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    })
  },
};
