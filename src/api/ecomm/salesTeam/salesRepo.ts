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
  performance:(payload: Payload) => Promise<AxiosResponse>;
  getleave:(payload: Payload) => Promise<AxiosResponse>;
  updateLeaveStatus:(payload: Payload) => Promise<AxiosResponse>;
  salesTeamDashboard:(payload: Payload) => Promise<AxiosResponse>;
  salesDashboard:(payload: Payload) => Promise<AxiosResponse>;
  TslDashboard:(payload: Payload) => Promise<AxiosResponse>;
}

export const salesTeamRepo: salesTeamRepo = {
  addsalesTeam(payload) {
    console.log(payload,"payloadpayloadpayload")
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
    performance(payload) {
    return Repository.post(APIName.performance, payload);
  },
  getleave(payload) {
    return Repository.post(APIName.getleave, payload);
  },
  updateLeaveStatus(payload) {
    return Repository.post(APIName.updateLeaveStatus, payload);
  },
  salesTeamDashboard(payload) {
    return Repository.post(APIName.salesdashboard, payload);
  },
  salesDashboard(payload) {
    return Repository.post(APIName.userdashboard, payload);
  },
  TslDashboard(payload) {
    return Repository.post(APIName.TslDashboard, payload);
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
