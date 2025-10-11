import { RoutineSchedules } from "../assets/data/dummyRoutine";
import DailyRoutineCard from "./DailyRoutineCard";
import moment from "moment/moment";

const Weekly = ({
  currentDate,
  currentDayOfThisWeek,
  firstDateOfThisWeek,
  lastDateOfThisWeek,
}) => {
  const routineScheduleList = RoutineSchedules.filter(
    (schedule) =>
      new Date(schedule.start_period) <= lastDateOfThisWeek &&
      new Date(schedule.end_period) >= firstDateOfThisWeek
  );
  const thisWeek = [];

  for (let i = 0; i < 7; i++) {
    thisWeek.push(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDayOfThisWeek + i
      )
    );
  }

  return (
    <div className="h-[80%] grid grid-cols-7 text-center">
      {thisWeek.map((el, i) => (
        <div
          key={i}
          className={`${
            el === thisWeek[0]
              ? "text-[#ec4e4e]"
              : el === thisWeek[6]
              ? "text-[#7892f0]"
              : "text-black"
          } border-t border-[#000000] ${
            el === thisWeek[6] ? "border-r-0" : "border-r"
          } h-full p-[15px_0] flex flex-col gap-3`}
        >
          {el.getDate()}
          <div className="w-full flex flex-col gap-3 text-black">
            {routineScheduleList.map((schedule) => {
              if (
                moment(el).isSameOrAfter(
                  new Date(schedule.start_period),
                  "day"
                ) &&
                moment(el).isSameOrBefore(
                  new Date(schedule.end_period),
                  "day"
                ) &&
                schedule.recurrence_rule.recurrence_type === "DAILY"
              ) {
                return <DailyRoutineCard schedule={schedule} />;
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Weekly;
