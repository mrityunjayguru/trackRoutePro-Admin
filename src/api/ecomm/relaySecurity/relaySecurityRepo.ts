import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface relaySecurityRepo {
  addrelaySecurity: (payload: Payload) => Promise<AxiosResponse>;
  getrelaySecurity: (payload: Payload) => Promise<AxiosResponse>;
  updaterelaySecurity:(payload: Payload) => Promise<AxiosResponse>;
}

export const relaySecurityRepo: relaySecurityRepo = {
  addrelaySecurity(payload) {
    return Repository.post(APIName.addrelaySecurity,payload);
  },
  getrelaySecurity(payload) {
    return Repository.post(APIName.getrelaySecurity, payload);
  },
  updaterelaySecurity(payload) {
    return Repository.post(APIName.updaterelaySecurity, payload);
  }
};
