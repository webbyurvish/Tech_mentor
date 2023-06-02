import axios from "axios";
import { API_URL } from "../config";

const createAxiosInstance = () => {
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: API_URL,
  });

  // Add an interceptor to handle errors and add authorization header
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      //   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      //   }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add an interceptor to handle errors
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error, e.g., redirect to login page
        // You can customize this part according to your application's logic
        // navigate("/login");
        console.log("Unauthorized error:", error.response.data);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
