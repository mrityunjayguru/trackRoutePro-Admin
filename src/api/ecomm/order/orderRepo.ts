import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface orderRepo {
  addgpsDevices: (payload: Payload) => Promise<AxiosResponse>;
  getgpsDevices: (payload: Payload) => Promise<AxiosResponse>;
  updategpsDevices:(payload: Payload) => Promise<AxiosResponse>;
}

export const orderRepo: orderRepo = {
  addgpsDevices(payload) {
    return Repository.post(APIName.addgpsDevices, payload);
  },
  getgpsDevices(payload) {
    return Repository.post(APIName.getgpsDevices, payload);
  },
  updategpsDevices(payload) {
    return Repository.post(APIName.updategpsDevices, payload);
  }
};
