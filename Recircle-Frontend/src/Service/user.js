import axios from "axios";
import api from "../api/axios";
import { config } from "./config";

/* ================= LOGIN ================= */
export async function login(email, password) {
  try {
    const url = `${config.server}/users/authenticate`
    const body = { email, password }
    const response = await axios.post(url, body)
    // console.log(response)
    return response.data



  }
  catch (ex) {
    return { error: "Invalid Credentials" }
  }
}
export async function updateProfile(userId, payload) {
  try {
    const res = await axios.put(`${config.server}/users/${userId}`, payload);


    // expected: { status: "success", data: {...user} }
    const body = res.data;
    if (body?.status !== "success") {
      throw new Error(body?.message || "Update failed");
    }
    return res.data;
  } catch (err) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong";
    throw msg;
  }
}


// export const updateProfile = async (userData) => {
//   try {
//     // If sending a raw file, use FormData
//     const formData = new FormData();
//     formData.append('fullName', userData.fullName);
//     formData.append('phone', userData.phone);
//     formData.append('bio', userData.bio);
//     formData.append('addresses', JSON.stringify(userData.profile.addresses));

//     // Only append photo if it's a new file object
//     if (userData.profilePhoto instanceof File) {
//       formData.append('profilePhoto', userData.profilePhoto);
//     }

//     const response = await axios.put(`${API_URL}/update`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });

//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || "Failed to update profile";
//   }
// };


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
