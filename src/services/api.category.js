import api from "../config/axios";

export const getCategories = async () => {
  try {
    const response = await api.get("categories");
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};
