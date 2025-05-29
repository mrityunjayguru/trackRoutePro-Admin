import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface addOnsRepo {
  addAddOns: (payload: Payload) => Promise<AxiosResponse>;
  getAddOns: (payload: Payload) => Promise<AxiosResponse>;
  updateAddOns:(payload: Payload) => Promise<AxiosResponse>;
}

export const addOnsRepo: addOnsRepo = {
  addAddOns(payload) {
    return Repository.post(APIName.addAddOns, payload);
  },
  updateAddOns(payload) {
    return Repository.post(APIName.updateAddOns, payload);
  },   
  getAddOns(payload: any) {
    return Repository.post(APIName.getAddOns, payload);
  },
};
