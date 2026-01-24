// src/utils/token.js

// GET TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};

// SAVE TOKEN
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// REMOVE TOKEN
export const removeToken = () => {
  localStorage.removeItem("token");
};

// CHECK IF LOGGED IN
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
