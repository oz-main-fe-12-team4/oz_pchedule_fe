import MainCalendar from "../components/calendar/MainCalendar";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import Button from "../components/Button";
import { useState } from "react";

const Main = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const thisYear = currentDate.getFullYear();
  const thisMonth = currentDate.getMonth() + 1;

  const handleClickPrev = () => {
    setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
  };
  const handleClickNext = () => {
    setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() + 1)));
  };

  return (
    <div className="h-[calc(100vh-100.18px)]">
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center gap-5 p-[28px_0_18px_0] text-2xl font-extrabold">
          <span className="w-[90px]">
            {thisYear}.{thisMonth}
          </span>
          <span onClick={handleClickPrev}>
            <MdOutlineNavigateBefore />
          </span>
          <span onClick={handleClickNext}>
            <MdOutlineNavigateNext />
          </span>
        </div>
        <Button children={"오늘"} onClick={() => setCurrentDate(new Date())} />
      </div>
      <MainCalendar year={thisYear} month={thisMonth} />
    </div>
  );
};
export default Main;
