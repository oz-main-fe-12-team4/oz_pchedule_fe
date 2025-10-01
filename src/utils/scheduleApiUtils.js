import { fetchPostSchedule, fetchPutSchedules } from "../services/scheduleApi";
import { toApiDate } from "../utils/dateFormat";

export async function saveScheduleUtil({
  id,
  title,
  startDate,
  endDate,
  startTime,
  endTime,
  category,
  priority,
  shareType,
  isRecurrence,
  recurrenceType,
  recurrenceWeekdays = [],
  recurrenceDay,
  recurrenceMonth,
  isSomeday = false,
  detailSchedules = [],
}) {
  const start_period = toApiDate(startDate, startTime);
  const end_period = toApiDate(endDate, endTime);

  if (id) {
    return fetchPutSchedules(
      id,
      title,
      start_period,
      end_period,
      category,
      priority,
      shareType,
      isRecurrence,
      recurrenceType,
      recurrenceWeekdays,
      recurrenceDay,
      recurrenceMonth,
      isSomeday,
      detailSchedules
    );
  }

  return fetchPostSchedule(
    title,
    start_period,
    end_period,
    category,
    priority,
    shareType,
    isRecurrence,
    recurrenceType,
    recurrenceWeekdays,
    recurrenceDay,
    recurrenceMonth,
    isSomeday,
    detailSchedules
  );
}

export function createHandleSave({ onClose, onSuccess, setLoading }) {
  return async function handleSave(payload) {
    try {
      setLoading?.(true);
      const res = await saveScheduleUtil(payload);
      onSuccess?.(res);
      onClose?.();
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setLoading?.(false);
    }
  };
}

// api mock
export const MOCK = {
  ENABLED: true, // 배포/실 API 연결 시 false
  DELAY_MS: 600,
  FORCE_ERROR: false, // 강제로 실패 시나리오
};

export function mockResponse({ ok = true, data = null, error = null }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ok) resolve({ ok: true, data });
      else reject({ ok: false, error: error ?? new Error("Mock Error") });
    }, MOCK.DELAY_MS);
  });
}
