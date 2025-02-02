import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}
interface AuthRepo {
  checkExistingUser: (payload: Payload) => Promise<AxiosResponse>;
}

export const existingUser: AuthRepo = {
  checkExistingUser(payload: Payload) {
    return Repository.post(APIName.checkExistingUser, payload);
  },
};
