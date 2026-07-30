import API from "../api/axios";

// Public
export const getFAQs = async () => {
  const response = await API.get("/faqs");
  return response.data;
};

// Admin (protected)
export const createFAQ = async (data) => {
  const response = await API.post("/faqs", data);
  return response.data;
};

export const updateFAQ = async (id, data) => {
  const response = await API.put(`/faqs/${id}`, data);
  return response.data;
};

export const deleteFAQ = async (id) => {
  const response = await API.delete(`/faqs/${id}`);
  return response.data;
};
