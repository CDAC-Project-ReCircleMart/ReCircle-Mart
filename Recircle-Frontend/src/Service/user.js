import axios from "axios";
import api from "../api/axios";
import { config } from "./config";

/* ================= LOGIN ================= */
export async function login(email, password) {
  try {
    const url = `${config.server}/users/authenticate`;
    const body = { email, password };

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    // backend returns: { token, status }
    return {
      status: response.data.status,
      token: response.data.token
    };
  } catch (ex) {
    console.error("Login error:", ex);
    return {
      status: "error",
      message: "Invalid credentials"
    };
  }
}

/* ================= REGISTER ================= */
export async function register(name, email, password, phone) {
  try {
    const response = await api.post("/users/register", {
      fullName: name,
      email: email,
      password: password,
      phone: phone
    });

    return {
      status: "success",
      data: response.data
    };
  } catch (ex) {
    console.error("Register error:", ex);
    return {
      status: "error",
      message: "Registration failed"
    };
  }
}
