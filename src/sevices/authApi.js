import axios from "axios";

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = null;
};

export const api = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL,
  withCredentials: true, // Refresh 쿠키 전송/수신 -> 서버 CORS 정책 : Access-Control-Allow-Credentials: true
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // const token = getAccessToken();
    // if (token === null) window.location.href = "/login";
    // if (token) config.headers.Authorization = `Bearer ${token}`;
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
      await api.post("/user/token/refresh");
      //   try {
      //     if (!res) throw new Error("access token 재발급 응답이 없습니다.");

      //     const data = await res.data;
      //     setAccessToken(data.access_token);
      //   } catch (err) {
      //     if (err.response?.status === 401) {
      //       setAccessToken(null);
      //     }
      //   }
    }
  }
);

export const fetchSignin = async (email, password, name) => {
  const userData = {
    email: email,
    password: password,
    name: name,
    profile_image: "string",
    allow_notification: true,
  };
  try {
    const res = await api.post("/user/signup", userData);
    if (!res) throw new Error("회원가입 응답이 없음.");

    if (res.status === 201) window.location.href = "/login";
    console.log(res);
  } catch (err) {
    console.error(err);
  }
};

export const fetchLogin = async (email, password) => {
  const userData = {
    email: email,
    password: password,
  };

  try {
    const res = await api.post("/user/login", userData);
    if (!res) throw new Error("로그인 응답이 없음.");

    if (res.status === 200) window.location.href = "/";
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
