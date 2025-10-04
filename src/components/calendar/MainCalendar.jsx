import DisplayWeeks from "./DisplayWeeks";
import DisplayDays from "./DisplayDays";
import { groupDatesByWeek } from "../../utils/groupDatesByWeek";

function MainCalendar({ year, month, onDayClick }) {
  // 매 달 1일
  const firstDayOfMonth = new Date(year, month - 1, 1);

  // 매 달의 마지막 날 (30일, 31일)
  const lastDayOfMonth = new Date(year, month, 0);

  const weeks = groupDatesByWeek(firstDayOfMonth, lastDayOfMonth); // 주들을 모을 배열

  const handleDayClick = (raw) => {
    const dateObj =
      raw instanceof Date ? raw : new Date(year, month - 1, Number(raw));
    onDayClick?.(dateObj);
  };

  return (
    <div className="w-[calc(100vw-200px)] p-5">
      <DisplayDays />
      <DisplayWeeks
        year={year}
        month={month}
        weeks={weeks}
        onDayClick={handleDayClick}
      />
    </div>
  );
}

export default MainCalendar;
