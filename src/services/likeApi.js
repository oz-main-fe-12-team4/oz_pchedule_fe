// src/sevices/likeApi.js
import { api } from "./api";

// false -> true
export async function likeSchedule(scheduleId) {
  if (!scheduleId) throw new Error("scheduleId가 없습니다.");
  const res = await api.post(
    `/schedule/${encodeURIComponent(scheduleId)}/like`,
    null
  );
  return res.data;
}

// true -> false
export async function unlikeSchedule(scheduleId) {
  if (!scheduleId) throw new Error("scheduleId가 없습니다.");
  const res = await api.delete(
    `/schedule/${encodeURIComponent(scheduleId)}/unlike`
  );
  return res.data;
}
