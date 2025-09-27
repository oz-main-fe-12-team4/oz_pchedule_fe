import { useEffect, useRef, useState } from "react";
import SubScheduleModal from "./SubScheduleModal";
import MainScheduleModal from "./MainScheduleModal";
import {
  toDate,
  toTime,
  toTimeString,
  toApiDate,
  toPeriod,
} from "../../utils/dateFormat";

const AddScheduleModal = ({
  id,
  title,
  content,
  onClose,
  onSubmit,
  defaultStartDate,
  defaultEndDate,
  defaultStartTime,
  defaultEndTime,
  showSub = true,
  periodStart,
  periodEnd,
  sameEndToStart = false,
}) => {
  const today = new Date();

  // 메인 일정 상태
  const [startDate, setStartDate] = useState(defaultStartDate ?? today);
  const [endDate, setEndDate] = useState(defaultEndDate ?? today);
  const [startTime, setStartTime] = useState(defaultStartTime ?? "00:00");
  const [endTime, setEndTime] = useState(defaultEndTime ?? "23:59");
  const [titleValue, setTitleValue] = useState(title || "");
  const [contentValue, setContentValue] = useState(content || "");
  const [mainScheduleSaved, setMainScheduleSaved] = useState(false);
  const [savedContent, setSavedContent] = useState("");

  // 세부 일정 상태
  const [subSchedules, setSubSchedules] = useState([]);
  const contentRef = useRef(null);

  // 필터 상태
  const [filters, setFilters] = useState({
    category: "daily",
    priority: "medium",
    share: "personalSchedule",
    repeat: "none",
    repeatSub: null,
  });
  const [openFilter, setOpenFilter] = useState(null);

  // 달력 모달
  const [calendarModal, setCalendarModal] = useState(false);
  const [activeDate, setActiveDate] = useState(null);

  const openCalendar = (dateType) => {
    setActiveDate(dateType);
    setCalendarModal(true);
  };
  const closeCalendar = () => setCalendarModal(false);

  const handleFilterToggle = (key) =>
    setOpenFilter((prev) => (prev === key ? null : key));
  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleDateSelect = (selected) => {
    if (!selected) return;
    const rangeDate = toPeriod(selected, periodStart, periodEnd);

    if (sameEndToStart) {
      setStartDate(rangeDate);
      setEndDate(rangeDate);
    } else {
      if (activeDate === "start") {
        setStartDate(rangeDate);
        if (rangeDate > endDate) setEndDate(rangeDate);
      } else if (activeDate === "end") {
        setEndDate(rangeDate);
        if (rangeDate < startDate) setStartDate(rangeDate);
      }
    }
    setCalendarModal(false);
    closeCalendar();
  };

  const handleSaveMainSchedule = () => {
    const payload = {
      id, // 상위에서 내려준 id
      title: titleValue,
      description: contentValue,
      start_time: toApiDate(startDate, startTime),
      end_time: toApiDate(endDate, endTime),
    };
    onSubmit?.(payload);
    setSavedContent(contentRef.current.value);
    if (showSub) setMainScheduleSaved(true);
  };

  // useEffect(() => {
  //   if (defaultStartDate)
  //     setStartDate(toPeriod(toDate(defaultStartDate), periodStart, periodEnd));
  //   if (defaultEndDate)
  //     setEndDate(toPeriod(toDate(defaultEndDate), periodStart, periodEnd));
  //   if (defaultStartTime) setStartTime(defaultStartTime);
  //   if (defaultEndTime) setEndTime(defaultEndTime);
  // }, [
  //   defaultStartDate,
  //   defaultEndDate,
  //   defaultStartTime,
  //   defaultEndTime,
  //   periodStart,
  //   periodEnd,
  // ]);
  useEffect(() => {
    if (sameEndToStart && startDate) {
      setEndDate(startDate);
    }
  }, [sameEndToStart, startDate]);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-md">
        {/* 메인 일정 */}
        <MainScheduleModal
          titleValue={titleValue}
          setTitleValue={setTitleValue}
          contentValue={contentValue}
          setContentValue={setContentValue}
          contentRef={contentRef}
          startDate={sameEndToStart ? startDate : endDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={sameEndToStart ? startDate : setEndDate}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          mainScheduleSaved={mainScheduleSaved}
          filters={filters}
          openFilter={openFilter}
          handleFilterToggle={handleFilterToggle}
          handleFilterChange={handleFilterChange}
          calendarModal={calendarModal}
          openCalendar={openCalendar}
          closeCalendar={closeCalendar}
          handleSaveMainSchedule={handleSaveMainSchedule}
          handleDateSelect={handleDateSelect}
          toTime={toTime}
          toTimeString={toTimeString}
          onClose={onClose}
          showSub={showSub}
          minDate={periodStart ? toDate(periodStart) : undefined}
          maxDate={periodEnd ? toDate(periodEnd) : undefined}
        />

        {/* 세부 일정 */}
        {showSub && mainScheduleSaved && (
          <SubScheduleModal
            subSchedules={subSchedules}
            setSubSchedules={setSubSchedules}
            savedContent={savedContent}
            startDate={startDate}
            endDate={endDate}
            startTime={startTime}
            endTime={endTime}
            filters={filters}
            openFilter={openFilter}
            handleFilterToggle={handleFilterToggle}
            handleFilterChange={handleFilterChange}
            toTime={toTime}
            toTimeString={toTimeString}
          />
        )}
      </div>
    </div>
  );
};

export default AddScheduleModal;
