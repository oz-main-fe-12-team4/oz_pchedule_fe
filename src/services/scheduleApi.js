import { api } from "./api";

export const fetchGetScheduleList = async () => {
  try {
    const res = await api.get("/schedule/schedules/");
    if (!res) throw new Error("일정리스트를 받아올 수 없습니다.");

    if (res.status === 200) return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//payload 객체 하나로 받기
export const fetchPostSchedule = async (payload) => {
  try {
    const res = await api.post("/schedule/schedules/", payload);
    if (!res) throw new Error("일정 등록이 안되었습니다.");
    if (res && res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.log(err);
    console.error("payload:", payload);
    console.error("server says:", err.response?.data);
    return false;
  }
};

export const fetchGetDetailSchedules = async (schedulesId) => {
  try {
    const res = await api.get(`/schedule/schedules/${schedulesId}/`);
    if (!res) throw new Error("상세일정을 받아올 수 없습니다.");

    // if (res.status === 200) return res.data;
    if (res && res.status >= 200 && res.status < 300) return res.data ?? true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchPutSchedules = async (
  schedulesId,
  mainTitle,
  startDate,
  endDate,
  category,
  priority,
  shareType,
  is_recurrence,
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
    is_someday: isSomeday,
    is_recurrence: is_recurrence,
    is_completed: false,
    recurrence_rule: {
      recurrence_type: recurrenceType || "DAILY",
      weekdays: Array.isArray(recurrenceWeekdays) ? recurrenceWeekdays : [0],
      day_of_month: recurrenceDay ?? 1,
      month_of_year: recurrenceMonth ?? 1,
    },
    detail_schedule: detailSchedules, // 배열
  };
  try {
    const res = await api.put(
      `/schedule/schedules/${schedulesId}/`,
      updateSchedule
    );
    if (!res) throw new Error("일정을 수정할 수 없습니다.");

    // if (res.status === 200) return res.data;
    if (res && res.status >= 200 && res.status < 300) return res.data ?? true;
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
    title,
    description,
    start_time: startTime,
    end_time: endTime,
    is_completed: isCompleted,
  };
  try {
    const res = await api.put(
      `/schedule/detail-schedules/${detailScheduleId}/`,
      newDetailSchedule
    );
    if (!res) throw new Error("상세일정을 수정할 수 없습니다.");
    if (res && res.status >= 200 && res.status < 300) return res.data ?? true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchDeleteSchedules = async (schedulesId) => {
  try {
    const res = await api.delete(`/schedule/schedules/${schedulesId}/`);
    if (!res) throw new Error("일정을 삭제할 수 없습니다.");

    // if (res.status === 200) return res.data;
    if (res && res.status >= 200 && res.status < 300) return res.data ?? true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const fetchDeleteDetailSchedule = async (detailScheduleId) => {
  try {
    const res = await api.delete(
      `/schedule/detail-schedules/${detailScheduleId}/`
    );
    if (!res) throw new Error("상세일정을 삭제할 수 없습니다.");

    // if (res.status === 200) return res.data;
    if (res && res.status >= 200 && res.status < 300) return res.data ?? true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// export const fetchPostSchedule = async (
//   mainTitle,
//   startDate,
//   endDate,
//   category,
//   priority,
//   shareType,
//   is_recurrence,
//   recurrence_type,
//   recurrence_weekdays,
//   recurrence_day,
//   recurrence_month,
//   is_someday,
//   detail_schedule
// ) => {
//   const newSchedule = {
//     title: mainTitle,
//     start_period: startDate,
//     end_period: endDate,
//     category,
//     priority,
//     share_type: shareType,
//     is_someday,
//     is_recurrence,
//     is_completed: false,
//     detail_schedule,
//     recurrence_rule: {
//       recurrence_type,
//       weekdays: recurrence_weekdays,
//       day_of_month: recurrence_day,
//       month_of_year: recurrence_month,
//     },
//   };

//   try {
//     const res = await api.post("/schedule/schedules/", newSchedule);
//     if (!res) throw new Error("일정 등록이 안되었습니다.");

//     // if (res.status === 200) return res.data;
//     if (res && res.status >= 200 && res.status < 300) return res.data;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };
