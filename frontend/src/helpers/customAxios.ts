import axios, { AxiosResponse } from "axios";

const baseURL = "http://localhost:5500";

export const AxiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    timeout: 8000,
  },
});

AxiosClient.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);
