import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const createAxiosInstance = () => {
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Adding an interceptor to add authorization header
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

  // an interceptor to handle errors
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
