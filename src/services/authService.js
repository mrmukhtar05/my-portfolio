import API from "../api/axios";

export const registerAdmin = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const loginAdmin = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};
