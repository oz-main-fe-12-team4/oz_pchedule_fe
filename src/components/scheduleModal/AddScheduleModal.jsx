import { FaTrash, FaTimes, FaPlusCircle } from "react-icons/fa";
import React, { useRef, useState } from "react";
import Button from "../common/Button";
import FilterButtons from "../common/FilterButtons";
import Input from "../common/Input";
import CalendarModal from "../common/CalendarModal";
import FilterOptionList from "../common/FilterOptionList";
import TimePicker from "./TimePicker";
import { FILTERS } from "../../constants/filterList";
import DatePicker from "./DatePicker";

const formatDate = (date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const AddScheduleModal = ({ title, content }) => {
  const today = new Date();

  // 메인 일정
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
  const [titleValue, setTitleValue] = useState(title || "");
  const [contentValue, setContentValue] = useState(content || "");
  const [mainScheduleSaved, setMainScheduleSaved] = useState(false);
  const [savedContent, setSavedContent] = useState("");

  // 세부 일정
  const [subContent, setSubContent] = useState("");
  const [subSelectedDate, setSubSelectedDate] = useState(startDate);
  const [subStartTime, setSubStartTime] = useState(startTime);
  const [subEndTime, setSubEndTime] = useState(endTime);
  const [subSchedules, setSubSchedules] = useState([]);
  const contentRef = useRef(null);

  // 공통
  const [calendarModal, setCalendarModal] = useState(false);
  const [activeDate, setActiveDate] = useState(null);
  const [openFilter, setOpenFilter] = useState(null);
  const [filters, setFilters] = useState({
    category: "daily",
    priority: "medium",
    share: "personalSchedule",
    repeat: "none",
    repeatSub: null,
  });

  const openCalendar = (dateType) => {
    setActiveDate(dateType);
    if (!mainScheduleSaved) setCalendarModal(true);
  };
  const closeCalendar = () => {
    setCalendarModal(false);
    setActiveDate(null);
  };

  const handleFilterToggle = (key) =>
    setOpenFilter((prev) => (prev === key ? null : key));
  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleDateSelect = (date) => {
    const selected = Array.isArray(date) ? date[0] : date;
    if (!selected) return;

    if (!mainScheduleSaved) {
      if (activeDate === "start") {
        setStartDate(selected);
        if (selected > endDate) setEndDate(selected);
      } else if (activeDate === "end") {
        setEndDate(selected);
        if (selected < startDate) setStartDate(selected);
      }
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

  const handleSaveMainSchedule = () => {
    setSavedContent(contentRef.current.value);
    setMainScheduleSaved(true);
    setSubSelectedDate(startDate);
    setSubStartTime(startTime);
    setSubEndTime(endTime);
  };

  const handleAddSubSchedule = () => {
    const newSub = {
      mainContent: savedContent || "메인 일정",
      content: subContent,
      startDate: subSelectedDate,
      endDate: subSelectedDate,
      startTime: subStartTime,
      endTime: subEndTime,
      filters,
    };
    setSubSchedules((prev) => [...prev, newSub]);
    setSubContent("");
    setSubSelectedDate(startDate);
    setSubStartTime(startTime);
    setSubEndTime(endTime);
  };

  const handleDeleteSub = (idx) => {
    setSubSchedules((prev) => prev.filter((_, i) => i !== idx));
  };

  const subDateOptions = [];
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    subDateOptions.push(new Date(date));
  }

  return (
    <div className="flex w-full justify-center bg-gray-50">
      <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] relative text-gray-800 w-full max-w-md mt-24">
        {/* 메인 일정 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 mt-2">
            <Input
              inputId="schedule-title"
              value={titleValue}
              setValue={setTitleValue}
              placeholder="메인 일정 제목"
              className="text-[22px] font-bold text-gray-700 placeholder-gray-300 border-none outline-none focus:ring-0"
              // disabled={mainScheduleSaved}
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
        <div className="mb-1 flex items-start gap-2">
          <button
            onClick={() => openCalendar("start")}
            className="text-gray-500 text-xl hover:text-gray-800 cursor-pointer"
          >
            {formatDate(startDate)}
          </button>
          <span className="text-gray-500">~</span>
          <button
            onClick={() => openCalendar("end")}
            className="text-gray-500 text-xl hover:text-gray-800 cursor-pointer"
          >
            {formatDate(endDate)}
          </button>
        </div>

        {/* 필터 */}
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
          {/* 선택된 필터 표시 */}
          <div className="mt-2 flex flex-wrap gap-2">
            {filters.category && (
              <span className="px-2 py-1 bg-gray-200 rounded text-sm">
                {
                  FILTERS.category.options.find(
                    (opt) => opt.value === filters.category
                  )?.name
                }
              </span>
            )}
            {filters.priority && (
              <span className="px-2 py-1 bg-gray-200 rounded text-sm flex items-center gap-1">
                {React.createElement(
                  FILTERS.priority.options.find(
                    (opt) => opt.value === filters.priority
                  )?.Icon,
                  {
                    className: FILTERS.priority.options.find(
                      (opt) => opt.value === filters.priority
                    )?.iconClass,
                    size: 12,
                  }
                )}
                {
                  FILTERS.priority.options.find(
                    (opt) => opt.value === filters.priority
                  )?.name
                }
              </span>
            )}
            {filters.share && (
              <span className="px-2 py-1 bg-gray-200 rounded text-sm flex items-center gap-1">
                {React.createElement(
                  FILTERS.share.options.find(
                    (opt) => opt.value === filters.share
                  )?.Icon,
                  { size: 12 }
                )}
                {
                  FILTERS.share.options.find(
                    (opt) => opt.value === filters.share
                  )?.name
                }
              </span>
            )}
            {filters.repeat && (
              <span className="px-2 py-1 bg-gray-200 rounded text-sm">
                {(() => {
                  const repeatOption = FILTERS.repeat.options.find(
                    (opt) => opt.value === filters.repeat
                  );
                  if (!repeatOption) return "";
                  if (repeatOption.value === "none") return repeatOption.name;
                  const sub = filters.repeatSub;
                  let subText = "";
                  if (
                    (repeatOption.value === "weekly" ||
                      repeatOption.value === "monthly") &&
                    Array.isArray(sub)
                  )
                    subText = sub.join(",");
                  if (repeatOption.value === "yearly" && Array.isArray(sub))
                    subText = sub
                      .map((s) => `${s.month}월${s.day}일`)
                      .join(", ");
                  return `${repeatOption.name}${
                    subText ? ` (${subText})` : ""
                  }`;
                })()}
              </span>
            )}
          </div>
        </div>

        {/* 시간 선택 */}
        <div className="flex items-center gap-2 mb-4">
          <TimePicker
            value={startTime}
            onChange={(t) => {
              const { nextStart, nextEnd } = ensureTimeRange(t, endTime);
              setStartTime(nextStart);
              setEndTime(nextEnd);
            }}
            format="hh:mm a"
            minuteStep={1}
            min="00:00"
            max="23:59"
            className="w-full"
            // disabled={mainScheduleSaved}
          />
          <span className="text-gray-400">~</span>
          <TimePicker
            value={endTime}
            onChange={(t) => {
              const { nextStart, nextEnd } = ensureTimeRange(startTime, t);
              setStartTime(nextStart);
              setEndTime(nextEnd);
            }}
            format="hh:mm a"
            minuteStep={1}
            min="00:00"
            max="23:59"
            className="w-full"
            // disabled={mainScheduleSaved}
          />
        </div>

        {/* 내용 입력 */}
        <Input
          inputId="schedule-content"
          value={contentValue}
          ref={contentRef}
          setValue={setContentValue}
          placeholder="메인 일정 내용"
          className="w-full text-[18px] font-bold text-gray-700 placeholder-gray-300 border-none outline-none focus:ring-0"
          maxLength={300}
          // disabled={mainScheduleSaved}
        />

        {!mainScheduleSaved && (
          <Button
            variant="confirm"
            className="mt-4 w-full"
            onClick={handleSaveMainSchedule}
          >
            메인 일정 저장
          </Button>
        )}

        {mainScheduleSaved && (
          <div className="mt-6 border-t pt-4">
            <div className="font-bold text-gray-700 text-lg mb-2">
              {contentValue}
            </div>

            <Input
              value={subContent}
              setValue={setSubContent}
              placeholder="세부 일정 내용"
              className="w-full text-[18px] font-bold text-gray-700 placeholder-gray-300 border-none outline-none focus:ring-0 mb-2"
            />

            <div className="flex items-center gap-2 mb-2">
              <DatePicker
                value={subSelectedDate}
                onChange={setSubSelectedDate}
                options={subDateOptions}
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <TimePicker
                value={subStartTime}
                onChange={setSubStartTime}
                min={startTime}
                max={endTime}
                className="w-full"
              />
              <span>~</span>
              <TimePicker
                value={subEndTime}
                onChange={setSubEndTime}
                min={startTime}
                max={endTime}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleAddSubSchedule}
              className="my-5 flex items-center gap-1"
            >
              <FaPlusCircle /> 일정추가
            </Button>

            {subSchedules.map((sch, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-3 mb-2 shadow-sm bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-700">
                      {sch.mainContent}
                    </div>
                    <div className="text-gray-500 text-sm">{sch.content}</div>
                    <div className="text-gray-400 text-xs mt-1">
                      {formatDate(sch.startDate)} | {sch.startTime}~
                      {sch.endTime}
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => handleDeleteSub(idx)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end gap-2 my-4">
              <Button variant="cancel">취소</Button>
              <Button variant="confirm">저장</Button>
            </div>
          </div>
        )}

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
                minDate={today}
                maxDate={null}
                showTodayButton
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddScheduleModal;
