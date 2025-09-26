import { api } from "./api.js";

/**
 * 비밀번호 변경 API 호출 함수
 * @param {string} currentPassword 현재 비밀번호
 * @param {string} newPassword 새 비밀번호
 * @param {string} confirmPassword 새 비밀번호 확인
 * @returns {Promise<boolean>} 성공 여부 (성공 시 true, 실패 시 false)
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
 * @returns {Promise<boolean>} 성공 여부 (성공 시 true, 실패 시 false)
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
