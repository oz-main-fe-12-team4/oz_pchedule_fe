import { useEffect, useRef } from "react";
import useScheduleStore from "../stores/useScheduleStore";
import {
  toDate,
  toTime,
  toApiDate,
  toPeriod,
  recurrenceToArgs,
  toTimeString,
} from "../utils/dateFormat";

import { fetchPostSchedule, fetchPutSchedules } from "../sevices/scheduleApi";

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

    const start_period = toTime(mainSchedule.startDate);
    const end_period = toTime(
      sameEndToStart ? mainSchedule.startDate : mainSchedule.endDate
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
      if (onClose) onClose(result);
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
    setStartTime: (time) => setMainSchedule("startTime", time),
    setEndTime: (time) => setMainSchedule("endTime", time),
  };
}
