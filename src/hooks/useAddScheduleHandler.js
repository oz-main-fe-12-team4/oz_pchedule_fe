import { useEffect, useRef } from "react";
import useScheduleStore from "../stores/useScheduleStore";
import {
  toDate,
  toApiDate,
  toPeriod,
  recurrenceToArgs,
  toTimeString,
} from "../utils/dateFormat";

import { fetchPostSchedule, fetchPutSchedules } from "../services/scheduleApi";

export default function useAddScheduleHandlers(props) {
  const {
    id,
    title,
    content,
    onSubmit,
    periodStart,
    periodEnd,
    defaultStartDate,
    defaultEndDate,
    defaultStartTime,
    defaultEndTime,
    sameEndToStart = false,
  } = props;

  const contentRef = useRef(null);

  const {
    mainSchedule,
    subSchedules,
    calendarModal,
    activeDate,
    openFilter,
    setMainSchedule,
    setMainScheduleFilters,
    // setSubSchedules,
    setCalendarModal,
    setActiveDate,
    setOpenFilter,
    saveMainSchedule,
    setLoading,
  } = useScheduleStore();

  useEffect(() => {
    if (title != null) setMainSchedule("title", title);
    if (content != null) setMainSchedule("description", content);

    if (defaultStartDate) setMainSchedule("startDate", defaultStartDate);
    if (defaultEndDate) {
      setMainSchedule(
        "endDate",
        sameEndToStart ? defaultStartDate ?? defaultEndDate : defaultEndDate
      );
    } else if (sameEndToStart && defaultStartDate) {
      setMainSchedule("endDate", defaultStartDate);
    }

    if (defaultStartTime) setMainSchedule("startTime", defaultStartTime);
    if (defaultEndTime) setMainSchedule("endTime", defaultEndTime);
  }, [
    title,
    content,
    defaultStartDate,
    defaultEndDate,
    defaultStartTime,
    defaultEndTime,
    sameEndToStart,
    setMainSchedule,
  ]);

  useEffect(() => {
    if (sameEndToStart && mainSchedule.startDate) {
      setMainSchedule("endDate", mainSchedule.startDate);
    }
  }, [sameEndToStart, mainSchedule.startDate, setMainSchedule]);

  const openCalendarHandler = (dateType) => {
    setActiveDate(dateType);
    setCalendarModal(true);
  };
  const closeCalendarHandler = () => setCalendarModal(false);

  const handleDateSelect = (selected) => {
    if (!selected) return;
    const rangeDate = toPeriod(
      selected,
      periodStart ? toDate(periodStart) : undefined,
      periodEnd ? toDate(periodEnd) : undefined
    );

    if (sameEndToStart) {
      setMainSchedule("startDate", rangeDate);
      setMainSchedule("endDate", rangeDate);
    } else {
      if (activeDate === "start") {
        setMainSchedule("startDate", rangeDate);
        if (rangeDate > mainSchedule.endDate)
          setMainSchedule("endDate", rangeDate);
      } else if (activeDate === "end") {
        setMainSchedule("endDate", rangeDate);
        if (rangeDate < mainSchedule.startDate)
          setMainSchedule("startDate", rangeDate);
      }
    }
    closeCalendarHandler();
  };

  const handleFilterChange = (key, value) => setMainScheduleFilters(key, value);
  const handleFilterToggle = (key) => setOpenFilter(key);

  const handleSaveMainSchedule = async (onClose) => {
    // onSubmit로 api 호출없이 바로 콜백
    // onSubmit이 없을 때는 API 저장 + 스토어 최신화 + 모달 닫기
    if (onSubmit) {
      const payload = {
        id,
        title: mainSchedule.title || title || "",
        description: mainSchedule.description || content || "",
        start_time: toApiDate(mainSchedule.startDate, mainSchedule.startTime),
        end_time: toApiDate(
          sameEndToStart ? mainSchedule.startDate : mainSchedule.endDate,
          mainSchedule.endTime
        ),
        detailSchedules: subSchedules ?? [],
      };
      onSubmit(payload);
      return;
    }

    // api 저장하기
    const start_period = toApiDate(
      mainSchedule.startDate,
      mainSchedule.startTime
    );
    const end_period = toApiDate(
      sameEndToStart ? mainSchedule.startDate : mainSchedule.endDate,
      mainSchedule.endTime
    );

    const {
      isRecurrence,
      recurrenceType,
      recurrenceWeekdays,
      recurrenceDay,
      recurrenceMonth,
    } = recurrenceToArgs(mainSchedule.filters);

    const mainTitle = mainSchedule.title || title || "";
    const category = mainSchedule.filters.category;
    const priority = mainSchedule.filters.priority;
    const shareType = mainSchedule.filters.share;
    const isSomeday = mainSchedule.filters.isSomeday ?? false;
    const detailSchedules = Array.isArray(subSchedules) ? subSchedules : [];

    // 로딩중이라면
    setLoading?.(true);
    try {
      let result;
      if (id) {
        result = await fetchPutSchedules(
          id,
          mainTitle,
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
      } else {
        result = await fetchPostSchedule(
          mainTitle,
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

      // 성공일때 스토어 동기화
      if (result) {
        saveMainSchedule({
          id: result.id ?? id ?? null,
          title: mainTitle,
          description: mainSchedule.description || content || "",
          start_time: start_period,
          end_time: end_period,
          filters: mainSchedule.filters,
          isRecurrence,
          recurrenceType,
          recurrenceWeekdays,
          recurrenceDay,
          recurrenceMonth,
        });

        onClose?.(result);
      }
      return result;
    } catch (e) {
      console.error("[handleSaveMainSchedule] save failed:", e);
      throw e;
    } finally {
      setLoading?.(false);
    }
  };

  return {
    contentRef,
    mainSchedule,
    subSchedules,
    calendarModal,
    activeDate,
    openFilter,
    openCalendarHandler,
    closeCalendarHandler,
    handleDateSelect,
    handleFilterChange,
    handleFilterToggle,
    handleSaveMainSchedule,
    toTimeString,

    // TimePicker에서 바로 store 값을 바꿀 수 있도록
    setStartTime: (time) => setMainSchedule("startTime", time),
    setEndTime: (time) => setMainSchedule("endTime", time),
  };
}
