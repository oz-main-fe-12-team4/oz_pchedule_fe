import axios from "axios";
// import { fetchGetUserData } from "./userApi";

// API 인스턴스: 인증 및 모든 API 호출에 사용
export const api = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await api.post("/api/token/refresh");
    }
    return Promise.reject(error);
  }
);

//-----------------------------------------------
//  회원 인증 및 사용자 관련 API 함수들
//-----------------------------------------------

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

    // if (res.status === 200 && res.data?.is_admin === true) {
    //   return {
    //     userData: await fetchGetUserData(),
    //     is_admin: true,
    //   };
    // }

    if (res.status === 200) {
      return res.data.is_admin;
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

export const fetchChangePassword = async (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  try {
    const requestBody = {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirm: confirmPassword,
    };

    const response = await api.patch("/user/me/edit/password", requestBody);
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    if (error.response) {
      alert(
        `비밀번호 변경 실패: ${
          error.response.data.error || "유효하지 않은 입력입니다."
        }`
      );
    } else {
      console.error("API 호출 중 오류 발생:", error);
      alert(
        "비밀번호 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
  }
  return false;
};

export const fetchWithdrawUser = async () => {
  try {
    const response = await api.delete("/user/me/withdraw");
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    if (error.response) {
      alert(
        `회원 탈퇴 실패: ${error.response.data.error || "오류가 발생했습니다."}`
      );
    } else {
      console.error("API 호출 중 오류 발생:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }
  return false;
};
