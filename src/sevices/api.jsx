// sevices/api.js
import axios from "axios";

const rawBase = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000";
const API_BASE = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // 쿠키 전송
});

// 요청 인터셉터: 로컬스토리지 토큰이 있으면 자동으로 Authorization 헤더 부착
api.interceptors.request.use(
  (config) => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : "";
      if (token) {
        config.headers = config.headers || {};
        // 서버가 쿠키 인증을 기본으로 하더라도, 요구사항: 로컬스토리지에 있다고 가정 → 헤더 자동 부착
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("[API] request interceptor error:", e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
