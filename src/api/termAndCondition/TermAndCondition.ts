import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface termAndConditionRepo {
  gettermAndCondition: (payload: Payload) => Promise<AxiosResponse>;
  updatetermAndCondition: (payload: Payload) => Promise<AxiosResponse>;
  createtermAndCondition:(payload: Payload) => Promise<AxiosResponse>;
}

export const termAndConditionRepo: termAndConditionRepo = {
  gettermAndCondition(payload) {
    return Repository.post(APIName.getTermAndCondition, payload);
  },
  updatetermAndCondition(payload) {
    return Repository.post(APIName.updateTermAndCondition, payload);
  },
   createtermAndCondition(payload) {
    return Repository.post(APIName.createTermAndCondition,payload)},
};
