import axios from "axios";

const rawBase = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000";
const API_BASE = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

const api = axios.create({ baseURL: API_BASE });
const authHeaders = (token) =>
  token ? { Authorization: `Bearer ${token}` } : {};

export async function likeSchedule(scheduleId, token) {
  if (!scheduleId) throw new Error("scheduleId가 없습니다.");
  const res = await api.post(
    `/schedule/${encodeURIComponent(scheduleId)}/like`,
    null,
    {
      headers: authHeaders(token),
    }
  );
  return res.data;
}

export async function unlikeSchedule(scheduleId, token) {
  if (!scheduleId) throw new Error("scheduleId가 없습니다.");
  const res = await api.delete(
    `/schedule/${encodeURIComponent(scheduleId)}/unlike`,
    {
      headers: authHeaders(token),
    }
  );
  return res.data;
}
