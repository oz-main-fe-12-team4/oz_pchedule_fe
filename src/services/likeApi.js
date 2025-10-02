// services/likeApi.js
import { api } from "./api";

// 좋아요 추가: false -> true
export async function likeSchedule(scheduleId) {
  if (!scheduleId) throw new Error("scheduleId가 없습니다.");
  const res = await api.post(
    `/schedule/${encodeURIComponent(scheduleId)}/like`,
    null
  );
  return res.data; // { message: "좋아요에 추가되었습니다." }
}

// 좋아요 취소: true -> false
export async function unlikeSchedule(scheduleId) {
  if (!scheduleId) throw new Error("scheduleId가 없습니다.");
  const res = await api.delete(
    `/schedule/${encodeURIComponent(scheduleId)}/unlike`
  );
  return res.data; // { message: "좋아요가 취소되었습니다." }
}
