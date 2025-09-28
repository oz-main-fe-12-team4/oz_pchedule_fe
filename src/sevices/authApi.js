import axios from "axios";
import { fetchGetUserData } from "./userApi";

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
      await api.post("/api/token/refresh");
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

    if (res.status === 409 || res.status === 422) return res;
  } catch (err) {
    console.error(err);
    alert("예기치 못한 서버오류가 있습니다. 잠시후 다시 시도해주세요.");
    return false;
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

    if (res.status === 200 && res.data?.is_admin === true) {
      return {
        userData: await fetchGetUserData(),
        is_admin: true,
      };
    }

    if (res.status === 200) {
      return { userData: await fetchGetUserData(), is_admin: false };
    }

    if (res.status === 403)
      alert("정지된 계정입니다. 관리자에게 문의하세요. (admin@admin.com)");
  } catch (err) {
    console.log(err);
    alert("예기치 못한 서버오류가 있습니다. 잠시후 다시 시도해주세요.");
  }
};

export const fetchLogout = async () => {
  try {
    const res = await api.post("/user/logout");
    if (!res) throw new Error("로그아웃 응답 없음.");

    if (res.status === 200) return res;
  } catch (err) {
    console.log(err);
    alert("예기치 못한 서버오류가 있습니다. 잠시후 다시 시도해주세요.");
  }
};
