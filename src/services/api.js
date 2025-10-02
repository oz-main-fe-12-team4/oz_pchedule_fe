import axios from "axios";

export const setAccessToken = (token) => {
  window.localStorage.setItem("access_token", token);
};

export const getAccessToken = () => window.localStorage.getItem("access_token");

export const clearAccessToken = () => {
  window.localStorage.removeItem("access_token");
};

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Refresh 쿠키 전송/수신 -> 서버 CORS 정책 : Access-Control-Allow-Credentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    // if (token === null) window.location.href = "/login"; // 로그인 하기 전에도 로그인화면으로 이동
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const res = await api.post("/token/refresh/");
        if (!res) throw new Error("access token 재발급 응답이 없습니다.");

        const data = await res.data;
        setAccessToken(data.access_token);
      } catch (err) {
        if (err.response?.status === 401) {
          setAccessToken(null);
        }
      }
    }
  }
);
