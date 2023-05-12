import axios from "axios";
import { AxiosRequestConfig } from "axios";
const config: AxiosRequestConfig = {
  baseURL: "/api",
};
const http = axios.create(config);
http.interceptors.response.use((response) => {
  const data = response.data && response.data.data;
  if (data) {
    response.data = data;
  }
  return response;
});
export default http;
