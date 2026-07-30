import API from "../api/axios";

// Public
export const getJourneys = async () => {
  const response = await API.get("/journeys");
  return response.data;
};

// Admin (protected)
export const createJourney = async (data) => {
  const response = await API.post("/journeys", data);
  return response.data;
};

export const updateJourney = async (id, data) => {
  const response = await API.put(`/journeys/${id}`, data);
  return response.data;
};

export const deleteJourney = async (id) => {
  const response = await API.delete(`/journeys/${id}`);
  return response.data;
};
