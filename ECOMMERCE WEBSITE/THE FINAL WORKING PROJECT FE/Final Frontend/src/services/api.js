import axios from "axios";
import { getToken } from "../utils/token";

// CREATE AXIOS INSTANCE
const api = axios.create({
  baseURL: "http://localhost:8080/api", // 🔴 CHANGE if your backend URL is different
  withCredentials: true,
});

// 🔴 ADD TOKEN TO EVERY REQUEST AUTOMATICALLY
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
