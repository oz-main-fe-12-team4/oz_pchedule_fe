import { create } from "zustand";
import { toApiDate, toDate, toPeriod, toTime } from "../utils/dateFormat";
import { recurrenceToArgs } from "../utils/repeat";
import useScheduleStore from "./useScheduleStore";

const today = new Date();

const useAddScheduleStore = create((set, get) => ({
  id: null,
  titleValue: "",
  contentValue: "",
  startDate: today,
  endDate: today,
  startTime: "00:00",
  endTime: "23:59",
  mainScheduleSaved: false,
  savedContent: "",
  subSchedules: [],

  filters: {
    category: "daily",
    priority: "medium",
    share: "personalSchedule",
    repeat: "none",
    repeatSub: null,
  },
  openFilter: null,

  calendarModal: false,
  activeDate: null,

  // ===== 초기화/세터 =====
  initFromProps(props = {}) {
    const {
      id = null,
      title = "",
      content = "",
      defaultStartDate,
      defaultEndDate,
      defaultStartTime,
      defaultEndTime,
    } = props;

    set({
      id,
      titleValue: title || "",
      contentValue: content || "",
      startDate: defaultStartDate ?? today,
      endDate: defaultEndDate ?? today,
      startTime: defaultStartTime ?? "00:00",
      endTime: defaultEndTime ?? "23:59",
      mainScheduleSaved: false,
      savedContent: "",
      subSchedules: [],
      // filters/openFilter/calendar는 그대로 유지(필요시 여기서도 초기화 가능)
    });
  },

  setTitleValue(v) {
    set({ titleValue: v });
  },
  setContentValue(v) {
    set({ contentValue: v });
  },
  setStartDate(d) {
    set({ startDate: d });
  },
  setEndDate(d) {
    set({ endDate: d });
  },
  setStartTime(t) {
    set({ startTime: t });
  },
  setEndTime(t) {
    set({ endTime: t });
  },

  setSubSchedules(updater) {
    set((state) => ({
      subSchedules:
        typeof updater === "function" ? updater(state.subSchedules) : updater,
    }));
  },

  setSavedContent(v) {
    set({ savedContent: v });
  },
  setMainScheduleSaved(v) {
    set({ mainScheduleSaved: v });
  },

  setFilters(updater) {
    set((state) => ({
      filters: typeof updater === "function" ? updater(state.filters) : updater,
    }));
  },
  setOpenFilter(key) {
    set({ openFilter: key });
  },

  openCalendar(dateType) {
    set({ activeDate: dateType, calendarModal: true });
  },
  closeCalendar() {
    set({ calendarModal: false });
  },

  toggleFilter(key) {
    set((state) => ({ openFilter: state.openFilter === key ? null : key }));
  },
  changeFilter(key, value) {
    set((state) => ({ filters: { ...state.filters, [key]: value } }));
  },

  // ===== 날짜 선택 처리 =====
  handleDateSelect(selected, periodStart, periodEnd, sameEndToStart) {
    if (!selected) return;
    const min = periodStart ? toDate(periodStart) : undefined;
    const max = periodEnd ? toDate(periodEnd) : undefined;
    const rangeDate = toPeriod(selected, min, max);

    const { activeDate, startDate, endDate } = get();

    if (sameEndToStart) {
      set({ startDate: rangeDate, endDate: rangeDate });
    } else {
      if (activeDate === "start") {
        set({
          startDate: rangeDate,
          endDate: rangeDate > endDate ? rangeDate : endDate,
        });
      } else if (activeDate === "end") {
        set({
          endDate: rangeDate,
          startDate: rangeDate < startDate ? rangeDate : startDate,
        });
      }
    }
    set({ calendarModal: false });
  },

  // ===== 저장 핸들러 =====
  async handleSaveMainSchedule({
    onSubmit,
    sameEndToStart = false,
    periodStart,
    periodEnd,
    contentRef,
  } = {}) {
    const {
      id,
      titleValue,
      contentValue,
      startDate,
      endDate,
      startTime,
      endTime,
      filters,
    } = get();

    // 1) 상위 콜백으로 저장 (편집 모드 등)
    if (onSubmit) {
      const payload = {
        id,
        title: titleValue,
        description: contentValue,
        start_time: toApiDate(startDate, startTime), // "YYYY-M-D HH:mm:ss"
        end_time: toApiDate(sameEndToStart ? startDate : endDate, endTime),
      };
      onSubmit(payload);
      set({
        savedContent: contentRef?.current?.value ?? titleValue,
        mainScheduleSaved: true,
      });
      return;
    }

    // 2) 공통 저장 (POST/PUT 자동 분기) — 기존 useScheduleStore의 saveSchedule 사용
    const start_period = toYMD(startDate);
    const end_period = toYMD(sameEndToStart ? startDate : endDate);

    const {
      isRecurrence,
      recurrenceType,
      recurrenceWeekdays,
      recurrenceDay,
      recurrenceMonth,
    } = recurrenceToArgs(filters);

    const detailSchedules = []; // 설계에 맞게 필요시 채우기
    const { saveSchedule } = useScheduleStore.getState();

    await saveSchedule({
      id,
      title: titleValue,
      start_period,
      end_period,
      category: filters.category,
      priority: filters.priority,
      share: filters.share,
      isRecurrence,
      recurrenceType,
      recurrenceWeekdays,
      recurrenceDay,
      recurrenceMonth,
      detailSchedules,
    });

    set({
      savedContent: contentRef?.current?.value ?? titleValue,
      mainScheduleSaved: true,
    });
  },
}));

export default useAddScheduleStore;
