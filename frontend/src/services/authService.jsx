// src/services/authService.jsx
import apiClient from "./api.jsx"; // Corrected: Explicitly import from .jsx

export const register = (userData) => {
  return apiClient.post("/auth/register", userData);
};

export const login = (credentials) => {
  return apiClient.post("/auth/login", credentials);
};

export const logout = () => {
  localStorage.removeItem("token");
};
