import { toast } from "react-toastify";
import api from "../config/axios";

export const getProduct = async () => {
  try {
    const response = await api.get("products");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const createProduct = async (product) => {
  try {
    const response = await api.post("products", product);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateProduct = async ({ id, product }) => {
  try {
    const response = await api.put(`products/${id}`, product);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`products/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
    return null;
  }
};


