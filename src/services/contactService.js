import API from "../api/axios";

// Public - visitor sends a message
export const sendContactMessage = async (data) => {
  const response = await API.post("/contact", data);
  return response.data;
};

// Admin (protected) - view / delete messages
export const getContacts = async () => {
  const response = await API.get("/contact");
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await API.delete(`/contact/${id}`);
  return response.data;
};
