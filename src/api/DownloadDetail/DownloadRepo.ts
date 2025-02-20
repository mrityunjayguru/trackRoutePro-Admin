import Repository from '../Repository';
import APIName from '../endPoints';
import { AxiosResponse } from 'axios';

interface Payload {}

interface DownloadRepoRepo {
  dowonloadUser: (payload: Payload) => Promise<AxiosResponse>;
  downloadAdmin: (payload: Payload) => Promise<AxiosResponse>;
  downloadDelear: (payload: Payload) => Promise<AxiosResponse>;
  downloadDevices: (payload: Payload) => Promise<AxiosResponse>;
  deviceTypes: (payload: Payload) => Promise<AxiosResponse>;
  downloadInventry: (payload: Payload) => Promise<AxiosResponse>;
}

export const DownloadRepoRepo: DownloadRepoRepo = {
  dowonloadUser(payload) {
    return Repository.post(APIName.dowonloadUser, payload);
  },
  downloadDelear(payload) {
    return Repository.post(APIName.downloadDelear, payload);
  },
  downloadAdmin(payload) {
    return Repository.post(APIName.downloadAdmin, payload);
  },
  downloadDevices(payload) {
    return Repository.post(APIName.downloadDevices, payload);
  },
  deviceTypes(payload) {
    return Repository.post(APIName.deviceTypes, payload);
  },
  downloadInventry(payload) {
    return Repository.post(APIName.downloadInventry, payload);
  },
};
