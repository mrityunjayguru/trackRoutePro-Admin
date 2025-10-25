import { AxiosInstance } from "axios";
import axios from "axios";
  const jsessionId = localStorage.getItem("jsessionid");


const Repository: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});
  console.log(jsessionId,"jsessionIdjsessionId")  
// Add a request interceptor to set the Authorization header
Repository.interceptors.request.use( 
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // ✅ Manually attach cookie if needed
  
    if (jsessionId) {
      config.headers["JSESSIONID"] = `JSESSIONID=${jsessionId}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


Repository.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default Repository;
