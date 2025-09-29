import { create } from "zustand";

const useScheduleStore = create((set) => ({
  schedules: {
    title: "",
    start_period: "",
    end_period: "",
    category: "",
    priority: "",
    share_type: "나만보기",
    is_recurrence: false,
    recurrence_type: "none",
    recurrence_weekdays: "",
    recurrence_day_of_month: new Date().getDate(),
    recurrence_month_of_year: new Date().getMonth() + 1,
    is_someday: false,
    detail_schedule: [], //[{},{},{}]
  },
  detailByScheduleId: {
    title: "",
    description: "",
    start_time: new Date(),
    end_time: new Date(),
    is_completed: false,
  },
  loading: false,

  setLoading(value) {
    set({ loading: value });
  },

  //추가 & 수정
  setDetailSchedule(newDetail) {
    set((state) => ({ detailByScheduleId: { ...state, newDetail } }));
  },
  setSchedules(newSchedule) {
    set((state) => ({ schedules: { ...state, newSchedule } }));
  },

  //수정할 때도 전체 값을 다 가져와서 보내야함 (초기화)
  setClearSchedule() {
    set(() => ({
      schedules: {
        title: "",
        start_period: "",
        end_period: "",
        category: "",
        priority: "",
        share_type: "나만보기",
        is_recurrence: false,
        recurrence_type: "none",
        recurrence_weekdays: "",
        recurrence_day_of_month: new Date().getDate(),
        recurrence_month_of_year: new Date().getMonth() + 1,
        is_someday: false,
        detail_schedule: [], //[{},{},{}]
      },
    }));
  },
}));

export default useScheduleStore;

// // GET /schedule/schedules (액션)
// async fetchGetScheduleList() {
//   const { setLoading, setError } = get();
//   setLoading("list", true);
//   setError(null);

//   try {
//     const res = await api.get("/schedule/schedules");
//     if (!res) throw new Error("일정리스트를 받아올 수 없습니다.");
//     if (res.status === 200) {
//       const list = res.data?.data ?? res.data ?? [];
//       set({ schedules: Array.isArray(list) ? list : [list] });
//       return res.data;
//     }
//     return false;
//   } catch (err) {
//     console.log(err);
//     setError(err);
//     return false;
//   } finally {
//     setLoading("list", false);
//   }
// },

// /** POST /schedule/schedules */
// async fetchPostSchedule(
//   mainTitle,
//   startDate = "",
//   endDate = "",
//   category,
//   priority,
//   shareType,
//   isRecurrence,
//   recurrenceType,
//   recurrenceWeekdays,
//   recurrenceDay,
//   recurrenceMonth,
//   isSomeday,
//   detailSchedules
// ) {
//   const { setLoading, setError } = get();
//   setLoading("post", true);
//   setError(null);

//   const body = {
//     title: mainTitle,
//     start_period: startDate,
//     end_period: endDate,
//     category,
//     priority,
//     share_type: shareType,
//     is_recurrence: isRecurrence,
//     recurrence_type: recurrenceType,
//     recurrence_weekdays: recurrenceWeekdays,
//     recurrence_day_of_month: recurrenceDay,
//     recurrence_month_of_year: recurrenceMonth,
//     is_someday: isSomeday,
//     detail_schedule: detailSchedules,
//   };

//   try {
//     const res = await api.post("/schedule/schedules", body);
//     if (!res) throw new Error("일정 등록이 안되었습니다.");
//     if (res.status === 200) {
//       const created = res.data?.data ?? res.data;
//       set((state) => {
//         if (Array.isArray(created)) {
//           return { schedules: [...created, ...state.schedules] };
//         }
//         if (created && created.id != null) {
//           return { schedules: [created, ...state.schedules] };
//         }
//         return state;
//       });
//       return res.data;
//     }
//     return false;
//   } catch (err) {
//     console.log(err);
//     setError(err);
//     return false;
//   } finally {
//     setLoading("post", false);
//   }
// },
// /** GET /schedule/schedules/:schedulesId */
// async fetchGetDetailSchedules(schedulesId) {
//   const { setLoading, setError } = get();
//   setLoading("detail", true);
//   setError(null);

//   try {
//     const res = await api.get(`/schedule/schedules/${schedulesId}`);
//     if (!res) throw new Error("상세일정을 받아올 수 없습니다.");
//     if (res.status === 200) {
//       const data = res.data?.data ?? res.data;
//       set((state) => ({
//         detailByScheduleId: {
//           ...state.detailByScheduleId,
//           [schedulesId]: data,
//         },
//       }));
//       return res.data;
//     }
//     return false;
//   } catch (err) {
//     console.log(err);
//     setError(err);
//     return false;
//   } finally {
//     setLoading("detail", false);
//   }
// },

// /** PUT /schedule/schedules/:schedulesId */
// async fetchPutSchedules(
//   schedulesId,
//   mainTitle,
//   startDate = "",
//   endDate = "",
//   category,
//   priority,
//   shareType,
//   isRecurrence,
//   recurrenceType,
//   recurrenceWeekdays,
//   recurrenceDay,
//   recurrenceMonth,
//   isSomeday,
//   detailSchedules
// ) {
//   const { setLoading, setError } = get();
//   setLoading("put", true);
//   setError(null);

//   const body = {
//     title: mainTitle,
//     start_period: startDate,
//     end_period: endDate,
//     category,
//     priority,
//     share_type: shareType,
//     is_recurrence: isRecurrence,
//     recurrence_type: recurrenceType,
//     recurrence_weekdays: recurrenceWeekdays,
//     recurrence_day_of_month: recurrenceDay,
//     recurrence_month_of_year: recurrenceMonth,
//     is_someday: isSomeday,
//     detail_schedule: detailSchedules,
//   };

//   try {
//     const res = await api.put(`/schedule/schedules/${schedulesId}`, body);
//     if (!res) throw new Error("일정을 수정할 수 없습니다.");
//     if (res.status === 200) {
//       const updated = res.data?.data ?? res.data;
//       set((state) => ({
//         schedules: state.schedules.map((s) =>
//           String(s.id) === String(schedulesId) ? { ...s, ...updated } : s
//         ),
//       }));
//       return res.data;
//     }
//     return false;
//   } catch (err) {
//     console.log(err);
//     setError(err);
//     return false;
//   } finally {
//     setLoading("put", false);
//   }
// },

// /** PUT /schedule/detail-schedules/:detailScheduleId */
// async fetchPutDetailSchedule(
//   detailScheduleId,
//   title,
//   description,
//   startTime,
//   endTime,
//   isCompleted
// ) {
//   const { setLoading, setError } = get();
//   setLoading("putDetail", true);
//   setError(null);

//   const body = {
//     title,
//     description,
//     start_time: startTime,
//     end_time: endTime,
//     is_completed: isCompleted,
//   };

//   try {
//     const res = await api.put(
//       `/schedule/detail-schedules/${detailScheduleId}`,
//       body
//     );
//     if (!res) throw new Error("상세일정을 수정할 수 없습니다.");
//     if (res.status === 200) {
//       return res.data;
//     }
//     return false;
//   } catch (err) {
//     console.log(err);
//     setError(err);
//     return false;
//   } finally {
//     setLoading("putDetail", false);
//   }
// },

// /** DELETE /schedule/schedules/:schedulesId */
// async fetchDeleteSchedules(schedulesId) {
//   const { setLoading, setError } = get();
//   setLoading("delete", true);
//   setError(null);

//   try {
//     const res = await api.delete(`/schedule/schedules/${schedulesId}`);
//     if (!res) throw new Error("일정을 삭제할 수 없습니다.");
//     if (res.status === 200) {
//       set((state) => {
//         const schedules = state.schedules.filter(
//           (s) => String(s.id) !== String(schedulesId)
//         );
//         const detailByScheduleId = { ...state.detailByScheduleId };
//         delete detailByScheduleId[schedulesId];
//         return { schedules, detailByScheduleId };
//       });
//       return res.data;
//     }
//     return false;
//   } catch (err) {
//     console.log(err);
//     setError(err);
//     return false;
//   } finally {
//     setLoading("delete", false);
//   }
// },

// /** DELETE /schedule/detail-schedules/:detailScheduleId */
// async fetchDeleteDetailSchedule(detailScheduleId) {
//   const { setLoading, setError } = get();
//   setLoading("deleteDetail", true);
//   setError(null);

//   try {
//     const res = await api.delete(
//       `/schedule/detail-schedules/${detailScheduleId}`
//     );
//     if (!res) throw new Error("상세일정을 삭제할 수 없습니다.");
//     if (res.status === 200) {
//       return res.data;
//     }
//     return false;
//   } catch (err) {
//     console.log(err);
//     setError(err);
//     return false;
//   } finally {
//     setLoading("deleteDetail", false);
//   }
// },

// /** SAVE  */
// async saveSchedule(payload) {
//   const {
//     id,
//     title,
//     start_period,
//     end_period,
//     category,
//     priority,
//     share,
//     isRecurrence,
//     recurrenceType,
//     recurrenceWeekdays,
//     recurrenceDay,
//     recurrenceMonth,
//     detailSchedules = [],
//   } = payload;

//   if (id) {
//     // 수정
//     return get().fetchPutSchedules(
//       id,
//       title,
//       start_period,
//       end_period,
//       category,
//       priority,
//       share,
//       isRecurrence,
//       recurrenceType,
//       recurrenceWeekdays,
//       recurrenceDay,
//       recurrenceMonth,
//       false, // isSomeday
//       detailSchedules
//     );
//   } else {
//     // 생성
//     return get().fetchPostSchedule(
//       title,
//       start_period,
//       end_period,
//       category,
//       priority,
//       share,
//       isRecurrence,
//       recurrenceType,
//       recurrenceWeekdays,
//       recurrenceDay,
//       recurrenceMonth,
//       false, // isSomeday
//       detailSchedules
//     );
//   }
// },
