import API from "../api/axios";

// Public
export const getSkills = async () => {
  const response = await API.get("/skills");
  return response.data;
};

// Admin (protected)
export const createSkill = async (data) => {
  const response = await API.post("/skills", data);
  return response.data;
};

export const updateSkill = async (id, data) => {
  const response = await API.put(`/skills/${id}`, data);
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await API.delete(`/skills/${id}`);
  return response.data;
};
