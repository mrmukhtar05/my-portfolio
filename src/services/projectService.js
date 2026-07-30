import API from "../api/axios";

// Public
export const getProjects = async () => {
  const response = await API.get("/projects");
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await API.get(`/projects/${id}`);
  return response.data;
};

// Admin (protected) - formData required because of image upload
export const createProject = async (formData) => {
  const response = await API.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProject = async (id, formData) => {
  const response = await API.put(`/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await API.delete(`/projects/${id}`);
  return response.data;
};
