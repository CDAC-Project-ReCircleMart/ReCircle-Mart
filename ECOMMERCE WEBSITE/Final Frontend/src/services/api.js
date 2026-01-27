// import axios from "axios";
// import { getToken } from "../utils/token";

// const api = axios.create({
//   baseURL: "http://localhost:8080/api",
//   // 🔴 IMPORTANT: NO withCredentials
// });

// // 🔴 ATTACH TOKEN TO EVERY REQUEST
// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
