import { useRef, useState } from "react";
import SubScheduleModal from "./SubScheduleModal";
import MainScheduleModal from "./MainScheduleModal";

const formatDate = (date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const AddScheduleModal = ({ title, content, onClose }) => {
  const today = new Date();

  // 메인 일정 상태
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
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
    if (activeDate === "start") {
      setStartDate(selected);
      if (selected > endDate) setEndDate(selected);
    } else if (activeDate === "end") {
      setEndDate(selected);
      if (selected < startDate) setStartDate(selected);
    }
    setCalendarModal(false);
    closeCalendar();
  };

  const handleSaveMainSchedule = () => {
    setSavedContent(contentRef.current.value);
    setMainScheduleSaved(true);
  };

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
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
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
          formatDate={formatDate}
          onClose={onClose}
        />

        {/* 세부 일정 */}
        {mainScheduleSaved && (
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
            formatDate={formatDate}
          />
        )}
      </div>
    </div>
  );
};

export default AddScheduleModal;
