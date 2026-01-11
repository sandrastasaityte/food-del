import axios from "axios";

export const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// Clerk token (AdminLayout sets it)
export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
};

// Safe image url for uploads
export const imageUrl = (filename) =>
  filename ? `${API_URL}/images/${encodeURIComponent(filename)}` : "";

// Optional: attach a request id for debugging
api.interceptors.request.use((config) => {
  config.headers["x-request-id"] =
    config.headers["x-request-id"] || `${Date.now()}-${Math.random()}`;
  return config;
});

// Helper to get a clean message everywhere
export const getApiErrorMessage = (err, fallback = "Server error") => {
  return (
    err?.response?.data?.message ||
    err?.message ||
    fallback
  );
};
