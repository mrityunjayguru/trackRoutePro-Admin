import Repository from "../Repository";
import APIName from "../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
  // Define the structure of the payload based on your requirements
}

interface ReportsRepo {
  ReportsUser: (payload: Payload) => Promise<AxiosResponse>;
  AllAdmin: (payload: Payload) => Promise<AxiosResponse>;
  updateAdmin: (payload: Payload) => Promise<AxiosResponse>;
  RootHistory: (payload: Payload) => Promise<AxiosResponse>;
  summaryReports: (payload: Payload) => Promise<AxiosResponse>;
  traivelReport: (payload: Payload) => Promise<AxiosResponse>;
  tripSummary: (payload: Payload) => Promise<AxiosResponse>;
  eventReports: (payload: Payload) => Promise<AxiosResponse>;
  distanceReport: (payload: Payload) => Promise<AxiosResponse>;
  stopAndIdols: (payload: Payload) => Promise<AxiosResponse>;
  AlertsReport: (payload: Payload) => Promise<AxiosResponse>;

}

export const ReportsRepo: ReportsRepo = {
  ReportsUser(payload) {
    return Repository.post(APIName.ReportsUser, payload);
  },
  
  AllAdmin(payload) {
    return Repository.post(APIName.allAdmin, payload);
  },

  updateAdmin(payload) {
    return Repository.post(APIName.updateAdmin, payload, {
    });
  },
  RootHistory(payload) {
    return Repository.post(APIName.RootHistory, payload, {
    });
  },
  summaryReports(payload) {
    return Repository.post(APIName.summaryReports, payload, {
    });
  },
  traivelReport(payload) {
    return Repository.post(APIName.traivelReport, payload, {
    });
  },
  tripSummary(payload) {
    return Repository.post(APIName.tripSummary, payload, {
    });
  },
  eventReports(payload) {
    return Repository.post(APIName.eventReports, payload, {
    });
  },
  distanceReport(payload) {
    return Repository.post(APIName.distanceReport, payload, {
    });
  },
  stopAndIdols(payload) {
    return Repository.post(APIName.stopAndIdols, payload, {
    });
  },
  AlertsReport(payload) {
    return Repository.post(APIName.AlertsReport, payload, {
    });
  },
};
