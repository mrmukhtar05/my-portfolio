import API from "../api/axios";

// ================= PUBLIC =================

export const getProjects = async () => {
  const response = await API.get("/projects");

  return response.data;
};

export const getProjectById = async (id) => {
  const response = await API.get(
    `/projects/${id}`
  );

  return response.data;
};

// ================= ADMIN =================

export const createProject = async (formData) => {
  const response = await API.post(
    "/projects",
    formData
  );

  return response.data;
};

export const updateProject = async (
  id,
  formData
) => {
  const response = await API.put(
    `/projects/${id}`,
    formData
  );

  return response.data;
};

export const deleteProject = async (id) => {
  const response = await API.delete(
    `/projects/${id}`
  );

  return response.data;
};