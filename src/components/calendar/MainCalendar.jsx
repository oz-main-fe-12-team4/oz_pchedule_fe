import { useState } from "react";
import { groupDatesByWeek } from "../../utils/groupDatesByWeek";
import DisplayWeeks from "./DisplayWeeks";
import DisplayDays from "./DisplayDays";

function MainCalendar() {
  const [currentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 매 달 1일
  const firstDayOfMonth = new Date(year, month, 1);

  // 매 달의 마지막 날 (30일, 31일)
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const weeks = groupDatesByWeek(firstDayOfMonth, lastDayOfMonth); // 주들을 모을 배열

  return (
    <>
      <DisplayDays />
      <div>
        <DisplayWeeks weeks={weeks} />
      </div>
    </>
  );
}

export default MainCalendar;
