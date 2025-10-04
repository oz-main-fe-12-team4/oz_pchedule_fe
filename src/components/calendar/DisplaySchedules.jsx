import { posts } from "../../assets/data/dummyPostList";
import { COL_END, COL_START, ROW_START } from "../../constants/gridClass";
import { toDate } from "../../utils/dateFormat";
import { getCategoryEmoji } from "../../utils/getCategoryEmoji";
import { getBackgroundColorOfPriority } from "../../utils/getColorOfPriority";

const DisplaySchedules = ({ week }) => {
  const scheduleListData = posts.data;
  const scheduleList = scheduleListData.map((schedule) => {
    const startDate = toDate(schedule.start_period);
    const endDate = toDate(schedule.end_period);
    const isStartDate = week.find((date) => startDate.getDate() === date.date)
      ? true
      : false;
    const isEndDate = week.find((date) => endDate.getDate() === date.date)
      ? true
      : false;

    return {
      id: schedule.id,
      start: startDate,
      end: endDate,
      priorityColor: getBackgroundColorOfPriority(schedule.priority),
      title: schedule.title,
      category: getCategoryEmoji(schedule.category_name),
      isStart: isStartDate,
      isEnd: isEndDate,
    };
  });

  scheduleList.sort(
    (a, b) => a.end - a.start - (b.end - b.start) || a.start - b.start
  );

  const filteredScheduleList = scheduleList.filter(
    (schedule) => schedule.isStart === true || schedule.isEnd === true
  );

  return (
    <div className="w-full absolute top-[30px] grid grid-cols-7 gap-1">
      {filteredScheduleList.map((schedule, index) => (
        <button
          key={schedule.id}
          className={`h-[20px] ${schedule.priorityColor} text-sm 
          ${
            schedule.isStart
              ? COL_START[new Date(schedule.start).getDay()] + " rounded-l-md"
              : COL_START[0]
          }
          ${
            schedule.isEnd
              ? COL_END[new Date(schedule.end).getDay()] + " rounded-r-md"
              : COL_END[7]
          }
          ${ROW_START[index]}
          `}
        >
          {schedule.category + schedule.title}
        </button>
      ))}
    </div>
  );
};

export default DisplaySchedules;
