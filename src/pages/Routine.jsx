import Button from "../components/Button";
import DisplayDays from "../components/calendar/DisplayDays";
import Weekly from "../components/Weekly";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { useState } from "react";

const Routine = () => {
  const [isWeekly, setIsWeekly] = useState(true);
  const currentDate = new Date();
  const thisYear = currentDate.getFullYear();
  const thisMonth = currentDate.getMonth() + 1;
  const currentDayOfThisWeek = currentDate.getDay();
  const firstDateOfThisWeek = currentDate.getDate() - currentDayOfThisWeek;
  const lastDateOfThisWeek = currentDate.getDate() + (6 - currentDayOfThisWeek);

  const handleClickListButton = () => {
    setIsWeekly(false);
  };
  const handleClickCalendarButton = () => {
    setIsWeekly(true);
  };

  return (
    <div className="w-[calc(100vw-200px)] h-[calc(100vh-100.18px)] p-5 relative">
      <div className="absolute top-5 right-5">
        <button
          onClick={handleClickListButton}
          className={`border rounded-[5px_0_0_5px] p-1 ${
            isWeekly ? "text-[#d9d9d9]" : "text-[#000000]"
          }`}
        >
          <BsList />
        </button>
        <button
          onClick={handleClickCalendarButton}
          className={`border rounded-[0_5px_5px_0] p-1 ${
            isWeekly ? "text-[#000000]" : "text-[#d9d9d9]"
          }`}
        >
          <CiCalendar />
        </button>
      </div>
      {isWeekly && (
        <div className="h-[100%] flex flex-col gap-3">
          <Button>오늘</Button>
          <h1 className="flex items-center gap-3 text-2xl font-bold pb-3">
            {thisYear}.{thisMonth}.{firstDateOfThisWeek} ~ {thisYear}.
            {thisMonth}.{lastDateOfThisWeek}
            <MdOutlineNavigateBefore />
            <MdOutlineNavigateNext />
          </h1>
          <DisplayDays />
          <Weekly firstDateOfThisWeek={firstDateOfThisWeek} />
        </div>
      )}
      {/* {!isWeekly && (

      )} */}
    </div>
  );
};
export default Routine;
