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

const MOCK_TEST = true;

const useAddScheduleHandlers = (props) => {
  const {
    id,
    title,
    content,
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
    setCalendarModal,
    setActiveDate,
    setOpenFilter,
    saveMainSchedule,
    setLoading,
    setSubSchedules,
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

  // sameEndToStart가 true면 endDate를 startDate에 맞춤
  useEffect(() => {
    if (sameEndToStart && mainSchedule.startDate) {
      setMainSchedule("endDate", mainSchedule.startDate);
    }
  }, [sameEndToStart, mainSchedule.startDate, setMainSchedule]);

  const openCalendarHandler = (dateType) =>
    useScheduleStore.getState().openCalendar?.(dateType) ??
    (setActiveDate(dateType), setCalendarModal(true));

  const closeCalendarHandler = () =>
    useScheduleStore.getState().closeCalendar?.() ?? setCalendarModal(false);

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

  // 메인 일정 저장-> 세부일정 모달창 열기
  const handleSaveMainSchedule = () => {
    const payload = {
      id,
      title: mainSchedule.title || title || "",
      description: mainSchedule.description || content || "",
      start_time: toApiDate(mainSchedule.startDate, mainSchedule.startTime),
      end_time: toApiDate(
        sameEndToStart ? mainSchedule.startDate : mainSchedule.endDate,
        mainSchedule.endTime
      ),
      filters: mainSchedule.filters,
      mainScheduleSaved: true,
      savedContent: mainSchedule.description || content || "",
    };
    // 전역 스토어에 머지
    saveMainSchedule(payload);
  };

  // 최종저장 -> api호출
  const handleSubmitSchedule = async (onClose) => {
    const start_period = toApiDate(
      mainSchedule.startDate,
      mainSchedule.startTime
    );
    const end_period = toApiDate(
      sameEndToStart ? mainSchedule.startDate : mainSchedule.endDate,
      mainSchedule.endTime
    );

    const detailSchedulesPayload = (
      Array.isArray(subSchedules) ? subSchedules : []
    ).map((sch) => {
      const start_time = toApiDate(
        sch.startDate ?? sch.start_time,
        sch.startTime ?? "00:00"
      );
      const end_time = toApiDate(
        sch.endDate ?? sch.startDate ?? sch.end_time,
        sch.endTime ?? "00:00"
      );
      return {
        title: sch.title ?? sch.mainContent ?? "",
        description: sch.description ?? sch.content ?? "",
        start_time,
        end_time,
        is_completed: Boolean(sch.is_completed) || false,
      };
    });

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
    // const detailSchedules = Array.isArray(subSchedules) ? subSchedules : [];

    console.log("[handleSubmitSchedule] request payload:", {
      isUpdate: Boolean(id),
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
      detailSchedulesPayload,
    });

    if (MOCK_TEST) {
      console.log("[MOCK] 저장 성공 처리");
      return true;
    }

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
          detailSchedulesPayload
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
          detailSchedulesPayload
        );
      }

      if (result) {
        // 성공 시 id 같은 서버 값으로 동기화 (mainScheduleSaved는 이미 true)
        console.log("[handleSubmitSchedule] API 성공:", result);
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

        if (typeof onClose === "function") onClose(result);
        return true;
      } else {
        console.warn("[handleSubmitSchedule] API 응답 없음");
      }
    } catch (e) {
      console.error("[handleSubmitSchedule] API 실패:", e);
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

    handleSaveMainSchedule, // 메인만 로컬 저장 -> 세부영역 오픈
    handleSubmitSchedule, // 최종 저장(API 호출)

    toTimeString,
    setStartTime: (time) => setMainSchedule("startTime", time),
    setEndTime: (time) => setMainSchedule("endTime", time),
    setSubSchedules,
    setMainSchedule,
  };
};
export default useAddScheduleHandlers;
