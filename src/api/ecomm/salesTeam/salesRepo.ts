import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface salesTeamRepo {
  addsalesTeam: (payload: Payload) => Promise<AxiosResponse>;
  getsalesTeam: (payload: Payload) => Promise<AxiosResponse>;
  updatesalesTeam:(payload: Payload) => Promise<AxiosResponse>;
}

export const salesTeamRepo: salesTeamRepo = {
  addsalesTeam(payload) {
    return Repository.post(APIName.addsalesTeam, payload,{
       headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getsalesTeam(payload) {
    return Repository.post(APIName.getsalesTeam, payload);
  },
  updatesalesTeam(payload) {
    return Repository.post(APIName.updatesalesTeam, payload,{
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  }
};
