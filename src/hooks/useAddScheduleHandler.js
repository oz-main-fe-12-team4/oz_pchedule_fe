import { useEffect, useRef } from "react";
import useScheduleStore from "../stores/useScheduleStore";
import { toDate, toApiDate, toPeriod, toTimeString } from "../utils/dateFormat";
import { fetchPostSchedule, fetchPutSchedules } from "../services/scheduleApi";
import { WEEKDAYS_KR } from "../utils/formatDateAndDay";
import { CATEGORY_OPTION_LIST } from "../constants/filterList";

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
    // setMainScheduleFilters,
    setCalendarModal,
    setActiveDate,
    setOpenFilter,
    saveMainSchedule,
    setLoading,
    setSubSchedules,
    clearMainSchedule,
  } = useScheduleStore();

  // 신규일정 등록일때, 스토어 전체 초기화 (최초 1회만 실행)
  useEffect(() => {
    if (!id) {
      clearMainSchedule();
      setMainSchedule("category_code", "daily");
      setMainSchedule("priority", "중간");
      setMainSchedule("share_type", "비공개");
      setMainSchedule("recurrence_rule", {
        recurrence_type: null,
        weekdays: [],
        day_of_month: null,
        month_of_year: null,
      });
    }
  }, [id, clearMainSchedule, setMainSchedule]);

  useEffect(() => {
    if (title != null) setMainSchedule("title", title);
    if (content != null) setMainSchedule("description", content);

    // 시간 먼저 설정
    if (defaultStartTime) setMainSchedule("startTime", defaultStartTime);
    else setMainSchedule("startTime", "00:00");

    if (defaultEndTime) setMainSchedule("endTime", defaultEndTime);
    else setMainSchedule("endTime", "23:59");

    // 날짜+시간 합쳐서 period 설정
    if (defaultStartDate) {
      const startTimeToUse = defaultStartTime || "00:00";
      setMainSchedule(
        "start_period",
        toApiDate(defaultStartDate, `${startTimeToUse}:00`)
      );
    }

    if (defaultEndDate) {
      const base = sameEndToStart
        ? defaultStartDate ?? defaultEndDate
        : defaultEndDate;
      const endTimeToUse = defaultEndTime || "23:59";
      setMainSchedule("end_period", toApiDate(base, `${endTimeToUse}:00`));
    } else if (sameEndToStart && defaultStartDate) {
      const endTimeToUse = defaultEndTime || "23:59";
      setMainSchedule(
        "end_period",
        toApiDate(defaultStartDate, `${endTimeToUse}:00`)
      );
    }
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
    if (sameEndToStart && mainSchedule.start_period) {
      setMainSchedule("end_period", mainSchedule.start_period);
    }
  }, [sameEndToStart, mainSchedule.start_period, setMainSchedule]);

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
      // 기존 시간 유지하면서 날짜만 변경
      const startTimeToUse = mainSchedule.startTime || "00:00";
      const endTimeToUse = mainSchedule.endTime || "23:59";

      setMainSchedule(
        "start_period",
        toApiDate(rangeDate, `${startTimeToUse}:00`)
      );
      setMainSchedule("end_period", toApiDate(rangeDate, `${endTimeToUse}:00`));
    } else {
      if (activeDate === "start") {
        const startTimeToUse = mainSchedule.startTime || "00:00";
        const updatedStart = toApiDate(rangeDate, `${startTimeToUse}:00`);

        setMainSchedule("start_period", updatedStart);

        if (toDate(updatedStart) > toDate(mainSchedule.end_period)) {
          const endTimeToUse = mainSchedule.endTime || "23:59";
          setMainSchedule(
            "end_period",
            toApiDate(rangeDate, `${endTimeToUse}:00`)
          );
        }
      } else if (activeDate === "end") {
        const endTimeToUse = mainSchedule.endTime || "23:59";
        const updatedEnd = toApiDate(rangeDate, `${endTimeToUse}:00`);

        setMainSchedule("end_period", updatedEnd);

        if (toDate(updatedEnd) < toDate(mainSchedule.start_period)) {
          const startTimeToUse = mainSchedule.startTime || "00:00";
          setMainSchedule(
            "start_period",
            toApiDate(rangeDate, `${startTimeToUse}:00`)
          );
        }
      }
    }
    closeCalendarHandler();
  };

  const handleTimeSelect = (dateType, selectedTime) => {
    if (!selectedTime) return;

    const startDateObj = toDate(mainSchedule.start_period);
    const endDateObj = toDate(mainSchedule.end_period);

    if (dateType === "start") {
      // 선택된 시간으로 start_period를 ISO로 바꾸기
      const nextStartISO = toApiDate(startDateObj, `${selectedTime}:00`);
      setMainSchedule("start_period", nextStartISO);
      setMainSchedule("startTime", selectedTime);

      // 같은 날이면 종료시간이 시작시간보다 빠르지 않게 만들기
      const [sh, sm] = selectedTime.split(":").map(Number);
      const [eh, em] = (mainSchedule.endTime || "00:00").split(":").map(Number);
      const sameDay = startDateObj.toDateString() === endDateObj.toDateString();

      if (sameDay && eh * 60 + em < sh * 60 + sm) {
        const nextEndISO = toApiDate(endDateObj, `${selectedTime}:00`);
        setMainSchedule("endTime", selectedTime);
        setMainSchedule("end_period", nextEndISO);
      }
    }

    if (dateType === "end") {
      // 선택된 시간으로 end_period를 ISO로 바꾸기
      const nextEndISO = toApiDate(endDateObj, `${selectedTime}:00`);
      setMainSchedule("end_period", nextEndISO);
      setMainSchedule("endTime", selectedTime);

      // 같은 날이면 종료가 시작보다 빠르지 않게 하기
      const [sh, sm] = (mainSchedule.startTime || "00:00")
        .split(":")
        .map(Number);
      const [eh, em] = selectedTime.split(":").map(Number);
      const sameDay =
        toDate(mainSchedule.start_period).toDateString() ===
        endDateObj.toDateString();

      if (sameDay && eh * 60 + em < sh * 60 + sm) {
        const nextStartISO = toApiDate(startDateObj, `${selectedTime}:00`);
        setMainSchedule("startTime", selectedTime);
        setMainSchedule("start_period", nextStartISO);
      }
    }
  };

  const handleFilterChange = (key, value) => {
    if (key === "category_code") {
      setMainSchedule(
        "category_code",
        typeof value === "object" ? value.value : String(value)
      );
    } else if (key === "priority") {
      setMainSchedule("priority", value);
    } else if (key === "share") {
      setMainSchedule("share_type", value);
    } else if (key === "repeat") {
      setMainSchedule("recurrence_rule", {
        ...mainSchedule.recurrence_rule,
        recurrence_type: value,
      });
    } else {
      setMainSchedule(key, value);
    }
  };
  const handleFilterToggle = (key) => setOpenFilter(key);

  // 메인 일정 저장-> 세부일정 모달창 열기
  const handleSaveMainSchedule = () => {
    const payload = {
      id,
      title: mainSchedule.title || title || "",
      description: mainSchedule.description || content || "",
      start_period: mainSchedule.start_period || null,
      end_period: mainSchedule.end_period || null,
      // filters: mainSchedule.filters,
      mainScheduleSaved: true,
      savedContent: mainSchedule.description || content || "",
    };
    // 전역 스토어에 저장
    saveMainSchedule(payload);
  };

  // 최종저장 -> api호출
  const handleSubmitSchedule = async (onClose) => {
    const start_period = mainSchedule.start_period;
    const end_period = mainSchedule.end_period;

    console.log("subSchedules확인용", subSchedules);

    const detailSchedulesPayload = subSchedules.map((sch) => ({
      title: sch.mainContent || "",
      description: sch.content || "",
      start_time: toApiDate(
        sch.start_period ?? start_period,
        `${sch.startTime || "00:00"}:00`
      ),
      end_time: toApiDate(
        sch.end_period ?? end_period,
        `${sch.endTime || "23:59"}:00`
      ),
      is_completed: Boolean(sch.is_completed) || false,
    }));

    const payload = {
      title: mainSchedule.title || title || "",
      start_period: mainSchedule.start_period || null,
      end_period: mainSchedule.end_period || null,
      category:
        CATEGORY_OPTION_LIST.find((o) => o.value === mainSchedule.category)
          ?.id || 1,
      priority: mainSchedule.priority || "중간",
      share_type: mainSchedule.share_type || "비공개",
      is_someday:
        mainSchedule.start_period && mainSchedule.end_period ? false : true,
      is_recurrence:
        mainSchedule.recurrence_rule.recurrence_type === null ? false : true,
      is_reported: Boolean(mainSchedule.is_reported),
      detail_schedule: detailSchedulesPayload,
      recurrence_rule: {
        recurrence_type: mainSchedule.recurrence_rule?.recurrence_type || null,
        weekdays:
          mainSchedule.recurrence_rule?.weekdays?.map((weekday) =>
            typeof weekday === "number" ? WEEKDAYS_KR[weekday] : weekday
          ) || [], // 문자열 배열
        day_of_month: mainSchedule.recurrence_rule?.day_of_month ?? null,
        month_of_year: mainSchedule.recurrence_rule?.month_of_year ?? null,
      },
    };

    console.log("[handleSubmitSchedule] 최종 payload:", payload);

    try {
      setLoading?.(true);
      const result = id
        ? await fetchPutSchedules(id, payload)
        : await fetchPostSchedule(payload);

      console.log("[handleSubmitSchedule] API 성공:", result);
      if (typeof onClose === "function") onClose(result);
      return true;
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
    handleSaveMainSchedule,
    handleSubmitSchedule,
    toTimeString,
    setStartTime: (time) => handleTimeSelect("start", time),
    setEndTime: (time) => handleTimeSelect("end", time),
    setSubSchedules,
    setMainSchedule,
    filters: {
      category: mainSchedule.category || "daily",
      priority: mainSchedule.priority || "중간",
      share: mainSchedule.share_type || "비공개",
      repeat: mainSchedule.recurrence_rule?.recurrence_type || null,
    },
  };
};

export default useAddScheduleHandlers;
