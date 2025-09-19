import MainCalendar from "../components/calendar/MainCalendar";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import Button from "../components/Button";

const Main = () => {
  const currentDate = new Date();
  const thisYear = currentDate.getFullYear();
  const thisMonth = currentDate.getMonth() + 1;

  return (
    <div className="h-[calc(100vh-100.18px)]">
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center gap-5 p-[28px_0_18px_0] text-2xl font-extrabold">
          {thisYear}.{thisMonth}
          <MdOutlineNavigateBefore />
          <MdOutlineNavigateNext />
        </div>
        <Button children={"오늘"} />
      </div>
      <MainCalendar year={thisYear} month={thisMonth} />
    </div>
  );
};
export default Main;
