import Repository from "../../Repository";
import APIName from "../../endPoints";
import { AxiosResponse } from "axios";

interface Payload {
}
interface gpsDevicesRepo {
  addgpsDevices: (payload: Payload) => Promise<AxiosResponse>;
  getgpsDevices: (payload: Payload) => Promise<AxiosResponse>;
  updategpsDevices:(payload: Payload) => Promise<AxiosResponse>;
  gpscategory:(payload: Payload) => Promise<AxiosResponse>;
  gpssubcategory:(payload: Payload) => Promise<AxiosResponse>;
getCategory:(payload: Payload) => Promise<AxiosResponse>;
categoruResult:(payload: Payload) => Promise<AxiosResponse>;
getGpsSubcaegory:(payload: Payload) => Promise<AxiosResponse>;
updatecategory:(payload: Payload) => Promise<AxiosResponse>;
updatesubcategory:(payload: Payload) => Promise<AxiosResponse>;
}

export const gpsDevicesRepo: gpsDevicesRepo = {
  addgpsDevices(payload) {
    return Repository.post(APIName.addgpsDevices,payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getgpsDevices(payload) {
    return Repository.post(APIName.getgpsDevices, payload);
  },
  
   categoruResult(payload) {
    return Repository.post(APIName.categoruResult, payload);
  },
  getCategory(payload) {
    return Repository.post(APIName.getcategory, payload);
  },
    gpscategory(payload) {
    return Repository.post(APIName.gpscategory, payload);
  },
 gpssubcategory(payload) {
    return Repository.post(APIName.gpssubcategory, payload);
  },
  getGpsSubcaegory(payload) {
    return Repository.post(APIName.getGpsSubcaegory, payload);
  },
  updatecategory(payload) {
    return Repository.post(APIName.updatecategory, payload);
  },
  updatesubcategory(payload) {
    return Repository.post(APIName.updatesubcategory, payload);
  },
  updategpsDevices(payload) {
    return Repository.post(APIName.updategpsDevices, payload, {
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
    });
  }
};
