import Button from "../components/Button";
import DisplayDays from "../components/calendar/DisplayDays";
import Weekly from "../components/Weekly";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { useState } from "react";
import FilterButtons from "../components/FilterButtons";
import { posts } from "../assets/data/dummyPostList";
import RoutineCard from "../components/RoutineCard";

const Routine = () => {
  const [isWeekly, setIsWeekly] = useState(true);
  const currentDate = new Date();
  const thisYear = currentDate.getFullYear();
  const thisMonth = currentDate.getMonth() + 1;
  const currentDayOfThisWeek = currentDate.getDay();
  const firstDateOfThisWeek = currentDate.getDate() - currentDayOfThisWeek;
  const lastDateOfThisWeek = currentDate.getDate() + (6 - currentDayOfThisWeek);

  const filterKeys = ["period", "time", "priority"];
  const list = posts.data;

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
      {!isWeekly && (
        <div className="flex flex-col gap-1">
          <FilterButtons keys={filterKeys} />
          <h1 className="flex items-center gap-3 pb-3">
            {thisYear}.{thisMonth}.{firstDateOfThisWeek} ~ {thisYear}.
            {thisMonth}.{lastDateOfThisWeek}
          </h1>
          <div className="flex flex-row gap-3 mb-4 border-b border-gray-200 pb-2">
            <p>전체</p>
            <p>완료된일</p>
            <p>해야할일</p>
          </div>
          <div className="divide-y-[0.5px] divide-gray-200">
            {list.map((post) => (
              <div key={post.post_id} className="py-4">
                <RoutineCard post={post} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Routine;
