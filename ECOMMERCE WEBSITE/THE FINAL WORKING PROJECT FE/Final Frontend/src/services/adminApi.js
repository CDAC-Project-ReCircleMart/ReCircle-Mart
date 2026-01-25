import axios from "axios";

/* 🔹 CREATE ADMIN AXIOS INSTANCE */
const adminApi = axios.create({
  baseURL: "http://localhost:8080/api/admin", // backend admin route
});

/* 🔹 ATTACH TOKEN AUTOMATICALLY TO EVERY REQUEST */
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/* ================= ADMIN API FUNCTIONS ================= */

/* DASHBOARD DATA */
export const getDashboardData = () => adminApi.get("/dashboard");

/* GET ALL USERS (with pagination later) */
export const getAllUsers = (page = 1, limit = 10, search = "") =>
  adminApi.get(`/users?page=${page}&limit=${limit}&search=${search}`);

/* DELETE USER */
export const deleteUser = (userId) => adminApi.delete(`/users/${userId}`);

/* UPDATE USER (EDIT USER) */
export const updateUser = (userId, data) =>
  adminApi.put(`/users/${userId}`, data);

export default adminApi;
