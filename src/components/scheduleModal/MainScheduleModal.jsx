import React from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import Input from "../common/Input";
import TimePicker from "./TimePicker";
import Button from "../common/Button";
import FilterButtons from "../common/FilterButtons";
import FilterOptionList from "../common/FilterOptionList";
import CalendarModal from "../common/CalendarModal";
import {
  FILTERS,
  CATEGORY_OPTION_LIST,
  PRIORITY_OPTION_LIST,
  SHARE_OPTION,
  REPEAT_OPTION_LIST,
} from "../../constants/filterList";
import { toTime } from "../../utils/dateFormat";

const MainScheduleModal = ({
  titleValue,
  setTitleValue,
  contentValue,
  setContentValue,
  contentRef,
  startDate,
  endDate,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  mainScheduleSaved,
  openFilter,
  handleFilterToggle,
  handleFilterChange,
  calendarModal,
  openCalendar,
  closeCalendar,
  handleSaveMainSchedule,
  handleDateSelect,
  onClose,
  showSub,
  maxDate,
  minDate,
  filters,
}) => {
  console.log("[MainScheduleModal] filters:", filters);
  console.log("[MainScheduleModal] filters.category:", filters.category);
  console.log(
    "[MainScheduleModal] CATEGORY_OPTION_LIST:",
    CATEGORY_OPTION_LIST
  );

  return (
    <div className="w-full">
      {/* 메인 일정 제목 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 mt-2">
          <Input
            inputId="schedule-title"
            value={titleValue}
            setValue={setTitleValue}
            placeholder="메인 일정 제목"
            className="text-[22px] font-bold text-gray-700 placeholder-gray-300 border-none outline-none focus:ring-0"
          />
        </div>
        <div className="flex items-center gap-3 text-gray-500 pt-1">
          <button className="hover:text-gray-700 cursor-pointer" type="button">
            <FaTrash />
          </button>
          <button
            className="hover:text-gray-700 cursor-pointer"
            type="button"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* 날짜 선택 버튼 */}
      <div className="mb-1 flex items-start gap-2">
        <button
          onClick={() => openCalendar("start")}
          className="text-gray-500 text-xl hover:text-gray-800 cursor-pointer"
        >
          {toTime(startDate)}
        </button>
        <span className="text-gray-500">~</span>

        {/* 종료 날짜 */}
        <button
          onClick={() => openCalendar("end")}
          className="text-gray-500 text-xl hover:text-gray-800 cursor-pointer"
        >
          {toTime(endDate)}
        </button>
      </div>

      {/* 필터링 */}
      <div className="mt-1 mb-1 relative">
        <FilterButtons
          keys={["category", "priority", "share", "repeat"]}
          onFilterToggle={handleFilterToggle}
        />
        <FilterOptionList
          openFilter={openFilter}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClose={() => handleFilterToggle(null)}
        />
      </div>

      {/* 선택된 필터 표시 */}
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.category && (
          <span className="px-2 py-1 bg-gray-200 rounded text-sm">
            {
              CATEGORY_OPTION_LIST.find((opt) => opt.value === filters.category)
                ?.name
            }
          </span>
        )}
        {filters.priority && (
          <span className="px-2 py-1 bg-gray-200 rounded text-sm flex items-center gap-1">
            {(() => {
              const opt = PRIORITY_OPTION_LIST.find(
                (opt) => opt.value === filters.priority
              );
              const Icon = opt && opt.Icon;
              return Icon ? <Icon size={12} className={opt.iconClass} /> : null;
            })()}
            {
              PRIORITY_OPTION_LIST.find((opt) => opt.value === filters.priority)
                ?.name
            }
          </span>
        )}
        {filters.share && (
          <span className="px-2 py-1 bg-gray-200 rounded text-sm flex items-center gap-1">
            {(() => {
              const opt = SHARE_OPTION.find(
                (opt) => opt.value === filters.share
              );
              const Icon = opt && opt.Icon;
              return Icon ? <Icon size={12} /> : null;
            })()}
            {SHARE_OPTION.find((opt) => opt.value === filters.share)?.name}
          </span>
        )}
        {filters.repeat && (
          <span className="px-2 py-1 bg-gray-200 rounded text-sm">
            {(() => {
              const repeatOption = REPEAT_OPTION_LIST.find(
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
                subText = sub.map((s) => `${s.month}월${s.day}일`).join(", ");
              return `${repeatOption.name}${subText ? ` (${subText})` : ""}`;
            })()}
          </span>
        )}
      </div>

      {/* 시간 선택 */}
      <div className="flex items-center gap-2 mb-4">
        <TimePicker
          value={startTime || "00:00"}
          onChange={(selectedTime) => {
            console.log(
              "[MainScheduleModal] startTime onChange:",
              selectedTime
            );
            setStartTime(selectedTime);
          }}
          minuteStep={1}
          min="00:00"
          max="23:59"
          className="w-full"
        />
        <span className="text-gray-400">~</span>
        <TimePicker
          value={endTime || "23:59"}
          onChange={(selectedTime) => setEndTime(selectedTime)}
          format="hh:mm"
          minuteStep={1}
          min={startTime || "00:00"}
          max="23:59"
          className="w-full"
        />
      </div>

      {/* 세부 일정 내용 */}
      <Input
        inputId="schedule-content"
        value={contentValue}
        ref={contentRef}
        setValue={setContentValue}
        placeholder="메인 일정 내용"
        className="w-full text-[18px] font-bold text-gray-700 placeholder-gray-300 border-none outline-none focus:ring-0"
        maxLength={300}
      />

      {/* 세부 일정 저장 버튼 */}
      {!mainScheduleSaved && (
        <Button
          variant="confirm"
          onClick={handleSaveMainSchedule}
          className="w-full mt-7 bg-[#2F7884] hover:bg-[#5AA5B2] text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors duration-200"
        >
          {showSub ? "메인 일정 저장" : "세부 일정 저장"}
        </Button>
      )}

      {/* 캘린더 모달 */}
      {calendarModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <button
              onClick={closeCalendar}
              className="text-gray-400 hover:text-gray-600 mb-4"
            >
              <FaTimes />
            </button>

            <CalendarModal
              variant="single"
              onDateChange={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
              showTodayButton
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainScheduleModal;
