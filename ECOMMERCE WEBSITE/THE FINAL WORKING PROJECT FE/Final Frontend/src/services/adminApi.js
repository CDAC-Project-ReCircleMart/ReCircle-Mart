import api from "./api";

/* DASHBOARD */
export const getDashboardStats = () => api.get("/admin/dashboard");
export const getUsersListingsChart = () =>
  api.get("/admin/charts/users-listings");
export const getVisitsChart = () => api.get("/admin/charts/visits");
export const getCategoryChart = () => api.get("/admin/charts/categories");

/* USERS */
export const getUsers = (page, limit, search) =>
  api.get(`/admin/users?page=${page}&limit=${limit}&search=${search}`);

export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data);

/* CALENDAR */
export const getAllEvents = () => api.get("/admin/events");

// 🔹 GET EVENTS BY DATE
// export const getEventsByDate = async (date) => {
//   const res = await api.get(`/admin/events/by-date?date=${date}`);
//   return res.data;
// };

// // 🔹 ADD EVENT
// export const addEvent = async (data) => {
//   const res = await api.post("/admin/events", data);
//   return res.data;
// };

// // 🔹 DELETE EVENT
// export const deleteEvent = async (id) => {
//   const res = await api.delete(`/admin/events/${id}`);
//   return res.data;
// };

// GET EVENTS BY DATE
export const getEventsByDate = async (date) => {
  const res = await api.get(`/admin/events/by-date?date=${date}`);
  return res.data;
};

// ADD EVENT
export const addEvent = async (data) => {
  const res = await api.post("/admin/events", data);
  return res.data;
};

// DELETE EVENT
export const deleteEvent = async (id) => {
  const res = await api.delete(`/admin/events/${id}`);
  return res.data;
};
