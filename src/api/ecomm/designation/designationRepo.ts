import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface designationRepo {
  adddesignation: (payload: Payload) => Promise<AxiosResponse>;
  getdesignation: (payload: Payload) => Promise<AxiosResponse>;
  updatedesignation:(payload: Payload) => Promise<AxiosResponse>;
}

export const designationRepo: designationRepo = {
  adddesignation(payload) {
    return Repository.post(APIName.adddesignation, payload);
  },
  getdesignation(payload) {
    return Repository.post(APIName.getdesignation, payload);
  },
  updatedesignation(payload) {
    return Repository.post(APIName.updatedesignation, payload);
  }
};
