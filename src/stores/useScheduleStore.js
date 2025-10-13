import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toTimeString, toDate } from "../utils/dateFormat";

const subScheduleTemplate = {
  title: "",
  description: "",
  start_time: null,
  end_time: null,
  is_completed: false,
};

const mainScheduleTemplate = {
  title: "",
  start_period: null,
  end_period: null,
  startTime: "00:00",
  endTime: "23:59",
  category: "daily",
  priority: "",
  share_type: "",
  is_recurrence: false,
  is_someday: false,
  is_completed: false,
  mainScheduleSaved: false,
  savedContent: "",
  recurrence_rule: {
    recurrence_type: null,
    weekdays: [], //id
    month_of_year: null,
    day_of_month: null,
  },
  detail_schedule: subScheduleTemplate,
};

const useScheduleStore = create(
  persist(
    (set) => ({
      mainSchedule: { ...mainScheduleTemplate },
      subSchedules: [],
      scheduleList: [],

      calendarModal: false,
      activeDate: null,
      openFilter: null,
      loading: false,

      setMainSchedule(field, value) {
        set((state) => ({
          mainSchedule: { ...state.mainSchedule, [field]: value },
        }));
      },

      setRecurrenceRule(key, value) {
        set((state) => ({
          mainSchedule: {
            ...state.mainSchedule,
            recurrence_rule: {
              ...state.mainSchedule.recurrence_rule,
              [key]: value,
            },
          },
        }));
      },

      // 시간만 변경하고 start_period도 함께 업데이트
      setStartTime(timeString) {
        set((state) => {
          const currentDate = state.mainSchedule.start_period
            ? toDate(state.mainSchedule.start_period)
            : new Date();

          const [hh, mm] = timeString.split(":");
          currentDate.setHours(parseInt(hh, 10));
          currentDate.setMinutes(parseInt(mm, 10));

          return {
            mainSchedule: {
              ...state.mainSchedule,
              startTime: timeString,
              start_period: currentDate.toISOString(),
            },
          };
        });
      },

      setEndTime(timeString) {
        set((state) => {
          const currentDate = state.mainSchedule.end_period
            ? toDate(state.mainSchedule.end_period)
            : new Date();

          const [hh, mm] = timeString.split(":");
          currentDate.setHours(parseInt(hh, 10));
          currentDate.setMinutes(parseInt(mm, 10));

          return {
            mainSchedule: {
              ...state.mainSchedule,
              endTime: timeString,
              end_period: currentDate.toISOString(),
            },
          };
        });
      },

      setMainScheduleFilters(key, value) {
        set((state) => ({
          mainSchedule: {
            ...state.mainSchedule,
            filters: { ...state.mainSchedule.filters, [key]: value },
          },
        }));
      },

      setSubSchedules(subs) {
        set({ subSchedules: subs }); // 배열 전체 교체
      },

      addSubSchedule(newSub) {
        set((state) => ({
          subSchedules: [...state.subSchedules, newSub],
        }));
      },

      setCalendarModal(value) {
        set({ calendarModal: value });
      },

      openCalendar(dateType) {
        set({ activeDate: dateType, calendarModal: true });
      },

      closeCalendar() {
        set({ calendarModal: false, activeDate: null });
      },

      setActiveDate(value) {
        set({ activeDate: value });
      },

      setOpenFilter(key) {
        set((state) => ({ openFilter: state.openFilter === key ? null : key }));
      },

      setLoading(value) {
        set({ loading: value });
      },

      saveMainSchedule({
        title,
        description,
        start_time,
        end_time,
        start_period,
        end_period,
      }) {
        set((state) => {
          const start = start_time ?? start_period;
          const end = end_time ?? end_period;

          const nextStartTime =
            typeof start === "string"
              ? toTimeString(start)
              : state.mainSchedule.startTime;

          const nextEndTime =
            typeof end === "string"
              ? toTimeString(end)
              : state.mainSchedule.endTime;

          const payload = {
            start_period: start,
            end_period: end,
            startTime: nextStartTime,
            endTime: nextEndTime,
            mainScheduleSaved: true,
            savedContent: description || title || "",
          };

          return { mainSchedule: { ...state.mainSchedule, ...payload } };
        });
      },

      clearMainSchedule() {
        set({
          mainSchedule: { ...mainScheduleTemplate },
          subSchedules: [], // 배열로 초기화
        });
      },

      addScheduleList(schedule) {
        set((state) => ({
          scheduleList: [schedule, ...state.scheduleList],
        }));
      },
    }),
    { name: "schedule-store", getStorage: () => localStorage }
  )
);
export default useScheduleStore;
