import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface UserRepo {
  getsetting: (payload: Payload) => Promise<AxiosResponse>;
  updatedevices: (payload: Payload) => Promise<AxiosResponse>;
  createsetting:(payload: Payload) => Promise<AxiosResponse>;
  getMaintenance:(payload: Payload) => Promise<AxiosResponse>;
  addMaintenance:(payload: Payload) => Promise<AxiosResponse>;
}

export const userRepo: UserRepo = {
  getsetting(payload) {
    return Repository.post(APIName.getsetting, payload);
  },
  updatedevices(payload) {
    return Repository.post(APIName.updateDevices, payload);
  },
  getMaintenance(payload) {
    return Repository.post(APIName.getMaintenance, payload);
  },
  addMaintenance(payload) {
    return Repository.post(APIName.addMaintenance, payload);
  },
   createsetting(payload) {
    return Repository.post(APIName.createsetting,payload,{
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
