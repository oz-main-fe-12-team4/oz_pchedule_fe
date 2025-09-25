import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL,
  withCredentials: true, // Refresh 쿠키 전송/수신 -> 서버 CORS 정책 : Access-Control-Allow-Credentials: true
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
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
    if (!res) throw new Error("회원가입 에러");

    if (res.status === 201) window.location.href = "/login";
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

    if (res.status === 200 && res.data?.is_admin === true)
      window.location.href = "/admin/user_list";

    if (res.status === 200) window.location.href = "/";

    // console.log(res);
  } catch (err) {
    console.log(err);
  }
};
