import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface couponRepo {
  addcoupon: (payload: Payload) => Promise<AxiosResponse>;
  getcoupon: (payload: Payload) => Promise<AxiosResponse>;
  updatecoupon:(payload: Payload) => Promise<AxiosResponse>;
}

export const couponRepo: couponRepo = {
  addcoupon(payload) {
    return Repository.post(APIName.addcoupon, payload);
  },
  getcoupon(payload) {
    return Repository.post(APIName.getcoupon, payload);
  },
  updatecoupon(payload) {
    return Repository.post(APIName.updatecoupon, payload);
  }
};
