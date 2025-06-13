import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface NotificationRepo {
  addNotification: (payload: Payload) => Promise<AxiosResponse>;
  getNotification: (payload: Payload) => Promise<AxiosResponse>;
}

export const NotificationRepo: NotificationRepo = {
  addNotification(payload) {
    return Repository.post(APIName.sendNotification, payload);
  },
  getNotification(payload) {
    return Repository.post(APIName.salesAppgetNotification, payload);
  },
};
