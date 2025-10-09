import axios from "axios";

export const setAccessToken = (token) => {
  window.localStorage.setItem("access_token", token);
};

export const getAccessToken = () => window.localStorage.getItem("access_token");

export const clearAccessToken = () => {
  window.localStorage.removeItem("access_token");
};

const baseUrl =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_API_BASE_URL
    : "/api";

export const api = axios.create({
  baseURL: baseUrl,
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
    return Promise.reject(err);
  }
);

//(_retry) : 요청은 이미 한 번 토큰 재발급을 거쳤다는 마킹용
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original?._retry) {
      try {
        const res = await api.post("/token/refresh/");
        if (!res) throw new Error("access token 재발급 응답이 없습니다.");

        const data = refreshRes.data;
        setAccessToken(data.access_token);

        if (res.status === 401) window.location.href = "/login";
      } catch (err) {
        if (err.response?.status === 401) {
          setAccessToken(null);
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         const res = await api.post("/api/token/refresh/");
//         if (!res) throw new Error("access token 재발급 응답이 없습니다.");

//         const data = await res.data;
//         setAccessToken(data.access_token);
//       } catch (err) {
//         if (err.response?.status === 401) {
//           setAccessToken(null);
//         }
//       }
//     }
//   }
// );
