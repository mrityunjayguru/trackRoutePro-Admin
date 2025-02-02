import Repository from "../Repository";
import APIName from "../../api/endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface UserRepo {
  Getsubscribers: (payload: Payload) => Promise<AxiosResponse>;
  delearSubscriber: (payload: Payload) => Promise<AxiosResponse>;
  updateSubscriber: (payload: Payload) => Promise<AxiosResponse>;
  addNewSubscriber:(payload: Payload) => Promise<AxiosResponse>;
  groupSubscriber:(payload: Payload) => Promise<AxiosResponse>;
  getDelearRecord:(payload: Payload) => Promise<AxiosResponse>;
  subscriberByDelear:(payload: Payload) => Promise<AxiosResponse>;
  getDelearSuport:(payload: Payload) => Promise<AxiosResponse>;

  
}

export const userRepo: UserRepo = {
  Getsubscribers(payload) {
    return Repository.post(APIName.subscribers, payload);
  },
  updateSubscriber(payload) {
    return Repository.post(APIName.updateSubscriber, payload,{
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  addNewSubscriber(payload) {
    return Repository.post(APIName.addNewSubscriber, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  groupSubscriber(payload) {
    return Repository.post(APIName.groupSubesciber, payload);
  },
  delearSubscriber(payload) {
    return Repository.post(APIName.delearSubscriber, payload);
  },
  getDelearRecord(payload) {
    return Repository.post(APIName.getDelearRecord, payload);
  },
  subscriberByDelear(payload) {
    return Repository.post(APIName.subscriberByDelear, payload);
  },
  getDelearSuport(payload) {
    return Repository.post(APIName.getDealearSuport, payload);
  },
};
