import { api } from "./api";

export const fetchGetUserData = async () => {
  try {
    const response = await api.get("/user/me/");
    if (!response) throw new Error("유저 정보를 받아 올 수 없습니다.");

    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) window.location.href = "/login";
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const fetchGetUserList = async () => {
  try {
    const res = await api.get("/user/users/");
    if (!res) throw new Error("유저 리스트를 받아올 수 없습니다.");

    if (res.status === 200) return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
