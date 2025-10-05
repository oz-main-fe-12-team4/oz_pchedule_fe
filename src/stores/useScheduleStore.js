import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toTimeString } from "../utils/dateFormat";

const mainScheduleTemplate = {
  id: null,
  title: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  startTime: "00:00",
  endTime: "23:59",
  filters: {
    category: "daily",
    priority: "medium",
    share: "personalSchedule",
    repeat: "none",
    repeatSub: null,
  },
  mainScheduleSaved: false,
  savedContent: "",
};

const subScheduleTemplate = {
  title: "",
  description: "",
  start_time: new Date(),
  end_time: new Date(),
  is_completed: false,
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

      addSubSchedule() {
        set((state) => ({
          subSchedules: [...state.subSchedules, { ...subScheduleTemplate }],
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
        id,
        title,
        description,
        start_time,
        end_time,
        filters,
      }) {
        set((state) => {
          const nextStartTime =
            typeof start_time === "string"
              ? toTimeString(start_time)
              : state.mainSchedule.startTime;

          const nextEndTime =
            typeof end_time === "string"
              ? toTimeString(end_time)
              : state.mainSchedule.endTime;

          const payload = {
            id,
            title,
            description,
            start_time,
            end_time,
            startTime: nextStartTime,
            endTime: nextEndTime,
            filters,
            mainScheduleSaved: true,
            savedContent: description || title,
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
