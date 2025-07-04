import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface Dashboard {
  Dashboards: (payload: Payload) => Promise<AxiosResponse>;
  setdashboardoverview: (payload: Payload) => Promise<AxiosResponse>;
  GetOtherDashboard: (payload: Payload) => Promise<AxiosResponse>;
}

export const Dashboard: Dashboard = {
  Dashboards(payload) {
    return Repository.post(APIName.getDashboard, payload);
  },
 GetOtherDashboard(payload) {
    return Repository.post(APIName.GetOtherDashboard, payload);
  },
  setdashboardoverview(payload) {
    return Repository.post(APIName.getDashboardOverview, payload);
  }
};
