import { api } from "./api";

export const fetchGetScheduleList = async () => {
  try {
    const res = await api.get("/schedule/schedules");
    if (!res) throw new Error("일정리스트를 받아올 수 없습니다.");

    if (res.status === 200) return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchPostSchedule = async (
  mainTitle,
  startDate = "",
  endDate = "",
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
) => {
  const newSchedule = {
    title: mainTitle,
    start_period: startDate,
    end_period: endDate,
    category: category,
    priority: priority,
    share_type: shareType,
    is_recurrence: isRecurrence,
    recurrence_type: recurrenceType,
    recurrence_weekdays: recurrenceWeekdays,
    recurrence_day_of_month: recurrenceDay,
    recurrence_month_of_year: recurrenceMonth,
    is_someday: isSomeday,
    detail_schedule: detailSchedules,
  };
  try {
    const res = await api.post("/schedule/schedules", newSchedule);
    if (!res) throw new Error("일정 등록이 안되었습니다.");

    if (res.status === 200) return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchGetDetailSchedules = async (schedulesId) => {
  try {
    const res = await api.get(`/schedule/schedules/${schedulesId}`);
    if (!res) throw new Error("상세일정을 받아올 수 없습니다.");

    if (res.status === 200) return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchPutSchedules = async (
  schedulesId,
  mainTitle,
  startDate = "",
  endDate = "",
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
) => {
  const updateSchedule = {
    title: mainTitle,
    start_period: startDate,
    end_period: endDate,
    category: category,
    priority: priority,
    share_type: shareType,
    is_recurrence: isRecurrence,
    recurrence_type: recurrenceType,
    recurrence_weekdays: recurrenceWeekdays,
    recurrence_day_of_month: recurrenceDay,
    recurrence_month_of_year: recurrenceMonth,
    is_someday: isSomeday,
    detail_schedule: detailSchedules,
  };
  try {
    const res = await api.put(
      `/schedule/schedules/${schedulesId}`,
      updateSchedule
    );
    if (!res) throw new Error("일정을 수정할 수 없습니다.");

    if (res.status === 200) return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchPutDetailSchedule = async (
  detailScheduleId,
  title,
  description,
  startTime,
  endTime,
  isCompleted
) => {
  const newDetailSchedule = {
    title: title,
    description: description,
    start_time: startTime,
    end_time: endTime,
    is_completed: isCompleted,
  };
  try {
    const res = await api.put(
      `/schedule/detail-schedules/${detailScheduleId}`,
      newDetailSchedule
    );
    if (!res) throw new Error("상세일정을 수정할 수 없습니다.");

    if (res.status === 200) return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchDeleteSchedules = async (schedulesId) => {
  try {
    const res = await api.delete(`/schedule/schedules/${schedulesId}`);
    if (!res) throw new Error("일정을 삭제할 수 없습니다.");

    if (res.status === 200) return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchDeleteDetailSchedule = async (detailScheduleId) => {
  try {
    const res = await api.delete(
      `/schedule/detail-schedules/${detailScheduleId}`
    );
    if (!res) throw new Error("상세일정을 삭제할 수 없습니다.");

    if (res.status === 200) return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
