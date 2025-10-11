import { api } from "./api";

export const fetchGetNotificationList = async () => {
  try {
    const response = await api.get("/notifications/");
    if (!response) throw new Error("알림 정보를 받아 올 수 없습니다.");

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const fetchPostNotification = async (notificationId) => {
  try {
    const res = await api.post(`/notifications/${notificationId}/read`);
    if (!res) throw new Error("알림을 읽을 수 없습니다.");

    if (res.status === 200) return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchDeleteNotification = async (notificationId) => {
  try {
    const res = await api.delete(`/notifications/${notificationId}/`);
    if (!res) throw new Error("얄림을 삭제할 수 없습니다.");

    if (res.status === 200) return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
