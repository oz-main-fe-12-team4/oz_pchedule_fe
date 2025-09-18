import { useState } from "react";
import MainCalendar from "../components/calendar/MainCalendar";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";

function Main() {
  const [currentDate] = useState(new Date());
  const thisYear = currentDate.getFullYear();
  const thisMonth = currentDate.getMonth() + 1;

  return (
    <div className="h-[calc(100vh-100.18px)]">
      <div className="flex items-center gap-5 p-[28px_0_18px_28px] text-2xl font-extrabold">
        {thisYear}.{thisMonth}
        <MdOutlineNavigateBefore />
        <MdOutlineNavigateNext />
      </div>
      <MainCalendar year={thisYear} month={thisMonth} />
    </div>
  );
}
export default Main;
