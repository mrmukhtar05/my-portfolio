import axios from "axios";

// Base URL of the backend API.
// Change this if you deploy the backend somewhere else (e.g. Render/Railway URL)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach admin JWT token (if logged in) to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If token is invalid/expired, auto logout the admin
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    }
    return Promise.reject(error);
  }
);

export default API;
