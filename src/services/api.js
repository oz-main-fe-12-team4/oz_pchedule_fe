// services/api.js
import axios from "axios";

const rawBase = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000";
const API_BASE = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // 쿠키 전송
});

api.interceptors.request.use(
  (config) => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : "";
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {}
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
