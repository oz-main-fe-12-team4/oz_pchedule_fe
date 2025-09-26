import axios from "axios";

// API 인스턴스 생성
const api = axios.create({
  baseURL: import.meta.env?.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 요청 전에 토큰 관련 로직 추가
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
      // 401 오류 처리 로직
      await api.post("/user/token/refresh");
    }
    return Promise.reject(error);
  }
);

/**
 * 비밀번호 변경 API 호출 함수
 */
export const changePassword = async (
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

/**
 * 회원 탈퇴 API 호출 함수
 */
export const withdrawUser = async () => {
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

export default api;
