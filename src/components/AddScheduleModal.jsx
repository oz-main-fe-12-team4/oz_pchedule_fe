import { FaTrash, FaTimes, FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import Button from "./common/Button";
import FilterButtons from "./common/FilterButtons";
import Input from "./common/Input";
import CalendarModal from "./common/CalendarModal";
import FilterOptionList from "./common/FilterOptionList";
import TimePicker from "./TimePicker";

const formatDate = (date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const AddScheduleModal = ({ title, content }) => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  const [titleValue, setTitleValue] = useState(title);
  const [contentValue, setContentValue] = useState(content);

  const [calendarModal, setCalendarModal] = useState(false);
  const [activeDate, setActiveDate] = useState(null);

  const [openFilter, setOpenFilter] = useState(null);
  const [filters, setFilters] = useState({
    category: null,
    priority: null,
    share: null,
    repeat: null,
    repeatSub: null,
  });

  const [schedules, setSchedules] = useState([]);

  const openCalendar = (dateType) => {
    setActiveDate(dateType);
    setCalendarModal(true);
  };
  const closeCalendar = () => {
    setCalendarModal(false);
    setActiveDate(null);
  };

  const handleFilterToggle = (key) => {
    setOpenFilter((prev) => (prev === key ? null : key));
  };
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // 기간이 반대로 넘어가는 거 방지
  const handleDateSelect = (date) => {
    const selected = Array.isArray(date) ? date[0] : date;
    if (!selected) return;
    if (activeDate === "start") {
      setStartDate(selected);
      if (selected > endDate) setEndDate(selected);
    } else {
      setEndDate(selected);
      if (selected < startDate) setStartDate(selected);
    }
    closeCalendar();
  };

  const toMinutes = (t) =>
    t
      .split(":")
      .map(Number)
      .reduce((a, b, i) => (i === 0 ? a + b * 60 : a + b), 0);
  const ensureTimeRange = (nextStart, nextEnd) => {
    const sameDay = startDate.toDateString() === endDate.toDateString();
    if (!sameDay) return { nextStart, nextEnd };
    if (toMinutes(nextEnd) < toMinutes(nextStart))
      return { nextStart, nextEnd: nextStart };
    return { nextStart, nextEnd };
  };

  const handleSave = () => {
    const newSchedule = {
      title: titleValue,
      content: contentValue,
      startDate,
      endDate,
      startTime,
      endTime,
      filters,
    };
    setSchedules((prev) => [...prev, newSchedule]);
  };

  const handleDelete = (index) => {
    setSchedules((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex w-full justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] relative text-gray-800 w-full max-w-md mt-24">
        {/* 제목 + 삭제/닫기 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 mt-2">
            <Input
              inputId="schedule-title"
              value={titleValue}
              setValue={setTitleValue}
              placeholder="일정 제목을 입력하세요"
              className="text-[22px] font-bold text-gray-700 placeholder-gray-300 border-none outline-none focus:ring-0"
              maxLength={70}
            />
          </div>
          <div className="flex items-center gap-3 text-gray-500 pt-1">
            <button
              className="hover:text-gray-700 cursor-pointer"
              type="button"
            >
              <FaTrash />
            </button>
            <button
              className="hover:text-gray-700 cursor-pointer"
              type="button"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* 날짜 선택 */}
        <div className="mb-1">
          <div className="flex items-start gap-2 py-3">
            <button
              onClick={() => openCalendar("start")}
              className="text-gray-500 text-xl hover:text-gray-800 transition-colors cursor-pointer font-medium"
            >
              {formatDate(startDate)}
            </button>
            <span className="text-gray-500">~</span>
            <button
              onClick={() => openCalendar("end")}
              className="text-gray-500 text-xl hover:text-gray-800 transition-colors cursor-pointer font-medium"
            >
              {formatDate(endDate)}
            </button>
          </div>
        </div>

        {/* 필터링 버튼 */}
        <div className="mt-1 mb-4 relative">
          <FilterButtons
            keys={["category", "priority", "share", "repeat"]}
            onFilterToggle={handleFilterToggle}
          />
          <FilterOptionList
            openFilter={openFilter}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClose={() => setOpenFilter(null)}
          />
        </div>

        {/* 시간 선택 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">시작 시간</div>
            <TimePicker
              value={startTime}
              onChange={(time) => {
                const { nextStart, nextEnd } = ensureTimeRange(time, endTime);
                setStartTime(nextStart);
                setEndTime(nextEnd);
              }}
              format="hh:mm a"
              minuteStep={1}
              min="00:00"
              max="23:59"
              className="w-full"
            />
          </div>
          <span className="text-gray-400">~</span>
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">끝 시간</div>
            <TimePicker
              value={endTime}
              onChange={(time) => {
                const { nextStart, nextEnd } = ensureTimeRange(startTime, time);
                setStartTime(nextStart);
                setEndTime(nextEnd);
              }}
              format="hh:mm a"
              minuteStep={1}
              min={
                startDate.toDateString() === endDate.toDateString()
                  ? startTime
                  : "00:00"
              }
              max="23:59"
              className="w-full"
            />
          </div>
        </div>

        {/* 일정 내용 */}
        <Input
          inputId="schedule-content"
          value={contentValue}
          setValue={setContentValue}
          placeholder="일정 내용"
          className="text-[18px] font-bold text-gray-700 placeholder-gray-300 border-none outline-none focus:ring-0"
          maxLength={100}
        />

        {/* 구분선 + 항목 추가 */}
        <div className="h-px w-full bg-gray-300 rounded-full my-4" />
        <button
          type="button"
          className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm mb-10 cursor-pointer select-none"
          aria-label="항목 추가"
        >
          <FaPlusCircle size={17} /> <span>항목추가</span>
        </button>

        {/* 하단 버튼 */}
        <div className="absolute bottom-4 right-4 flex justify-end gap-2">
          <Button variant="cancel" type="button">
            취소
          </Button>
          <Button variant="confirm" type="button" onClick={handleSave}>
            저장
          </Button>
        </div>

        {/* --- 저장된 일정 카드 --- */}
        <div className="mt-6">
          {schedules.map((sch, index) => (
            <div
              key={index}
              className="border rounded-xl p-3 mb-2 relative shadow-sm bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-700">{sch.title}</div>
                  <div className="text-gray-500 text-sm">{sch.content}</div>
                  <div className="text-gray-400 text-xs">
                    {formatDate(sch.startDate)} ~ {formatDate(sch.endDate)} |{" "}
                    {sch.startTime}~{sch.endTime}
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 달력 모달 */}
      {calendarModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={closeCalendar}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <CalendarModal
              variant="single"
              onDateChange={handleDateSelect}
              showTodayButton
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddScheduleModal;
