import axios from "axios";
import { config } from "./config";

export async function getAllProducts() {
  const response = await axios.get(`${config.server}/products`);
  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(`${config.server}/products/${id}`);
  return response.data;
}

export async function addProduct(product) {
  return axios.post(`${config.server}/products`, product, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
}
