import Button from "../components/common/Button";
import DisplayDays from "../components/calendar/DisplayDays";
import Weekly from "../components/Weekly";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { useState } from "react";
import FilterButtons from "../components/common/FilterButtons";
import RoutineCard from "../components/RoutineCard";
import TabButton from "../components/common/TabButton";
import PlusButton from "../components/common/PlusButton";
import AddScheduleModal from "../components/scheduleModal/AddScheduleModal";
import { RoutineSchedules } from "../assets/data/dummyRoutine";
import { toTime } from "../utils/dateFormat";

const Routine = () => {
  const [isWeekly, setIsWeekly] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentDayOfThisWeek = currentDate.getDay();
  const firstDateOfThisWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDayOfThisWeek
  );
  const lastDateOfThisWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + (6 - currentDayOfThisWeek)
  );

  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const filterKeys = ["period", "date", "priority"];
  const list = RoutineSchedules;

  const handleClickListButton = () => {
    setIsWeekly(false);
  };
  const handleClickCalendarButton = () => {
    setIsWeekly(true);
  };

  const handleClickPrev = () => {
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() - 7)));
  };
  const handleClickNext = () => {
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() + 7)));
  };

  return (
    <div className="w-[calc(100vw-200px)] h-[calc(100vh-100.18px)] pt-5 relative">
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
        <div className="h-[100%] flex flex-col gap-3 mx-5">
          <Button onClick={() => setCurrentDate(new Date())}>오늘</Button>
          <h1 className="flex items-center gap-1 text-xl font-bold pb-3">
            <div className="w-[350px] flex flex-col">
              {toTime(firstDateOfThisWeek)} ~ {toTime(lastDateOfThisWeek)}
            </div>
            <MdOutlineNavigateBefore onClick={handleClickPrev} />
            <MdOutlineNavigateNext onClick={handleClickNext} />
          </h1>
          <DisplayDays />
          <Weekly
            currentDate={currentDate}
            currentDayOfThisWeek={currentDayOfThisWeek}
            firstDateOfThisWeek={firstDateOfThisWeek}
            lastDateOfThisWeek={lastDateOfThisWeek}
          />
        </div>
      )}
      {!isWeekly && (
        <div className="flex flex-col gap-1  mx-6">
          <FilterButtons keys={filterKeys} />
          <h1 className="flex items-center gap-3 pb-3">
            {toTime(firstDateOfThisWeek)} ~
            <span>{toTime(lastDateOfThisWeek)}</span>
          </h1>
          <div className="w-full -mx-6">
            <TabButton />
          </div>
          <div className="divide-y-[0.5px] divide-gray-200">
            {list.map((post) => (
              <div key={post.id} className="py-4">
                <RoutineCard post={post} />
              </div>
            ))}
          </div>
        </div>
      )}
      <PlusButton onClick={() => setIsAddScheduleOpen(true)} />
      {isAddScheduleOpen && (
        <AddScheduleModal onClose={() => setIsAddScheduleOpen(false)} />
      )}
    </div>
  );
};
export default Routine;
