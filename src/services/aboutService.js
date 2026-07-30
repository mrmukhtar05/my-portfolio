import API from "../api/axios";

// Public
export const getAbout = async () => {
  const response = await API.get("/about");
  return response.data;
};

// Admin (protected)
export const updateAbout = async (data) => {
  const response = await API.put("/about", data);
  return response.data;
};
