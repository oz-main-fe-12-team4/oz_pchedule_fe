import { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarModal = ({
  variant = "range", // 'single' or 'range'
  onDateChange,
  showTodayButton = true,
  width = 400,
  height = 400,
}) => {
  moment.locale("ko");
  const isRange = variant === "range";

  const [singleValue, setSingleValue] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const handleChange = (val) => {
    if (!isRange) {
      const date = Array.isArray(val) ? val[0] : val;
      setSingleValue(date);
      onDateChange?.(date);
    } else {
      onDateChange?.(val);
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    if (!isRange) setSingleValue(today);
  };

  return (
    <div
      className="relative mx-auto mt-3 flex flex-col items-center justify-start "
      style={{ width, minHeight: height }}
    >
      <div className="relative">
        <Calendar
          className="react-calendar"
          locale="ko-KR"
          selectRange={isRange}
          allowPartialRange={true}
          value={!isRange ? singleValue : undefined}
          onChange={handleChange}
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          formatShortWeekday={(locale, date) => moment(date).format("ddd")}
          calendarType="gregory"
          showNeighboringMonth
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          activeStartDate={activeStartDate ?? undefined}
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate)
          }
        />

        {showTodayButton && (
          <div
            onClick={handleTodayClick}
            className="absolute right-[30px] top-[20px] z-[3] w-[90px] cursor-pointer rounded-full bg-[#5AA5B2] text-center text-[0.8rem] font-medium leading-[1.6rem] text-white"
          >
            오늘
          </div>
        )}
      </div>

      <style>{`
        .react-calendar {
          width: ${width}px;
          border-radius: 0.5rem;
          padding: 3% 5%;
          background-color: white;
          position: relative;
          z-index: 1;
        }

        /* 타일 클릭 가능 */
        .react-calendar .react-calendar__tile { pointer-events: auto; }

        .react-calendar__tile {
          position: relative;
          background-color: transparent;
          padding: 17px;
          cursor: pointer;
        }
        .react-calendar__tile:hover {
          background-color: #f3f4f6;
          border-radius: 8px;
        }

        /* range 클래스 스타일 */
        .react-calendar__tile--range,
        .react-calendar__tile--rangeStart,
        .react-calendar__tile--rangeEnd {
          background-color: #e5e7eb !important;
        }
        .react-calendar__tile--rangeStart {
          border-top-left-radius: 50%;
          border-bottom-left-radius: 50%;
        }
        .react-calendar__tile--rangeEnd {
          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;
        }

        .react-calendar__navigation {
          border-bottom: 1px solid #DFDFDF;
        }
        .react-calendar__navigation__label__labelText {
          color: #3F3F3F;
        }
        .react-calendar__navigation__arrow {
          background-color: transparent;
          color: #5AA5B2;
        }
        .react-calendar__navigation button {
          font-weight: 600;
          font-size: 1rem;
        }
        .react-calendar__navigation button:hover,
        .react-calendar__navigation button:active,
        .react-calendar__navigation button:focus {
          background-color: transparent;
          outline: none;
        }
        .react-calendar__navigation__label {
          flex-grow: 0 !important;
        }
        .react-calendar__navigation__label__labelText:hover {
          color: #3F3F3F;
        }

        .react-calendar__month-view__weekdays abbr {
          text-decoration: none;
          font-weight: 700;
        }
        .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
          color: #ff2424;
        }
        .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
          color: #2E7AF2;
        }
        .react-calendar__month-view__weekdays__weekday abbr {
          color: #424242;
        }
        .react-calendar__month-view__days__day--weekend:nth-child(7n) abbr {
          color: #2E7AF2;
        }
        .react-calendar__month-view__days__day:nth-child abbr {
          color: #424242;
        }
        .react-calendar__month-view__days__day--neighboringMonth abbr {
          color: #BDBDBD !important;
        }

        .react-calendar__tile--active {
          background: none;
          color: #424242;
        }

        /* 오늘 날짜  */
        .react-calendar__tile--now {
          background: none;
          position: relative;
          z-index: 1;
        }
        .react-calendar__tile--now abbr {
          color: white;
          position: relative;
          z-index: 2;
        }
        .react-calendar__tile--now::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #5AA5B2;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .react-calendar__year-view__months__month {
          border-radius: 0.8rem;
          background-color: white;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default CalendarModal;
