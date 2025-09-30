import { fetchPostSchedule, fetchPutSchedules } from "@/services/scheduleApi";
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
