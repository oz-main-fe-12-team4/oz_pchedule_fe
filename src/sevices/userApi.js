import { api } from "./authApi";

export const fetchGetUserData = async () => {
  try {
    const response = await api.get("/user/me");
    if (!response) throw new Error("유저 정보를 받아 올 수 없습니다.");

    if (response.status === 200) return response.data;
    if (response.status === 401) window.location.href = "/login";
  } catch (e) {
    console.log(e);
    alert("예기치 못한 서버오류가 있습니다. 잠시후 다시 시도해주세요.");
  }
};
