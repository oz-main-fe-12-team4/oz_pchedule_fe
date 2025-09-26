import MainCalendar from "../components/calendar/MainCalendar";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import Button from "../components/common/Button";
import PlusButton from "../components/common/PlusButton";
import { useState } from "react";
import AddScheduleModal from "../components/scheduleModal/AddScheduleModal";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Main = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const thisYear = currentDate.getFullYear();
  const thisMonth = currentDate.getMonth() + 1;
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const { userData } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === null) navigate("/login");
  }, [userData, navigate]);

  const handleClickPrev = () => {
    setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
  };
  const handleClickNext = () => {
    setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() + 1)));
  };

  const handleDayClick = (date) => {
    setPickedDate(date);
    setIsAddScheduleOpen(true);
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
      <div className="relative">
        <MainCalendar
          year={thisYear}
          month={thisMonth}
          onDayClick={handleDayClick}
        />

        <PlusButton onClick={() => setIsAddScheduleOpen(true)} />
        {isAddScheduleOpen && (
          <AddScheduleModal
            defaultStartDate={pickedDate}
            defaultEndDate={pickedDate}
            onClose={() => setIsAddScheduleOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
export default Main;
