import { FaTrash, FaTimes, FaPlusCircle } from "react-icons/fa";
import Button from "./Button";
import FilterButtons from "./FilterButtons";
import Input from "./Input";
import { useState } from "react";

const formatDate = (date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const AddScheduleModal = ({ title, period, content }) => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [titleValue, setTitleValue] = useState(title);

  const [calendarModal, setCalendarModal] = useState(false);
  const [activeDate, setActiveDate] = useState(null);

  const openCalendar = (dateType) => {
    setActiveDate(dateType);
    setCalendarModal(true);
  };

  const closeCalendar = () => {
    setCalendarModal(false);
    setActiveDate(null);
  };

  const handleDateSelect = (selectedDate) => {
    if (activeDate === "start") {
      setActiveDate(selectedDate);
    } else if (activeDate === "end") {
      setEndDate(selectedDate);
    }
    closeCalendar;
  };

  return (
    <div className="flex w-full justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] relative text-gray-800 w-full max-w-md mt-24">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 mt-2">
            {/* 일정 제목 */}
            <Input
              variant="setValue"
              inputId="schedule-title"
              value={titleValue}
              setValue={setTitleValue}
              placeholder={period || "일정 제목을 입력하세요"}
              className="text-[22px] font-bold text-gray-700 placeholder-gray-300 border-none outline-none focus:ring-0"
              maxLength={50}
            />
          </div>

          {/* 삭제 & 닫기 */}
          <div className="flex items-center gap-3 text-gray-500 pt-1">
            <button
              aria-label="삭제"
              className="hover:text-gray-700 cursor-pointer"
              type="button"
            >
              <FaTrash />
            </button>
            <button
              aria-label="닫기"
              className="hover:text-gray-700 cursor-pointer"
              type="button"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* 일정 기간 */}
        <div className="mb-4">
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
        <div className="mt-2 mb-4">
          <FilterButtons keys={["category", "priority", "share", "repeat"]} />
        </div>

        {/* 일정 내용 라벨 */}
        <Input
          variant="setValue"
          inputId="schedule-title"
          value={titleValue}
          setValue={setTitleValue}
          placeholder={period || "일정 내용"}
          className="text-[22px] font-bold text-gray-700 placeholder-gray-300 border-none outline-none focus:ring-0"
          maxLength={100}
        />

        {/* 항목 추가 구분선 */}
        <div className="h-[0.5px] w-full bg-gray-300 rounded-full my-3" />
        <p className="text-sm text-gray-700 whitespace-pre-line mb-6">
          {content}
        </p>

        {/* 항목 추가 */}
        <button
          type="button"
          className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm mb-10 cursor-pointer select-none"
          aria-label="항목 추가"
        >
          <FaPlusCircle size={17} />
          <span>항목추가</span>
        </button>

        {/* 하단 버튼 */}
        <div className="absolute bottom-4 right-4 flex justify-end gap-2">
          <Button variant="cancel" type="button">
            취소
          </Button>
          <Button variant="confirm" type="button">
            저장
          </Button>
        </div>
      </div>
      {calendarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {activeDate === "start" ? "시작 날짜 선택" : "종료 날짜 선택"}
              </h3>
              <button
                onClick={closeCalendar}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            {/* 여기에 실제 달력 컴포넌트를 넣으세요 */}
            <div className="text-center py-8 text-gray-500">
              달력 컴포넌트 영역
              <br />
              <small>실제 CommonCalendar 컴포넌트로 교체하세요</small>
            </div>

            {/* 임시 날짜 선택 버튼들 */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleDateSelect(new Date())}
                className="flex-1 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                오늘 선택
              </button>
              <button
                onClick={closeCalendar}
                className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddScheduleModal;
