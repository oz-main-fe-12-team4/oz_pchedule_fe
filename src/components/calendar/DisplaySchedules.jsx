import { useEffect } from "react";
import { COL_END, COL_START, ROW_START } from "../../constants/gridClass";
import { toDate } from "../../utils/dateFormat";
import { getCategoryEmoji } from "../../utils/getCategoryEmoji";
import { getBackgroundColorOfPriority } from "../../utils/getColorOfPriority";
import { fetchGetScheduleList } from "../../services/scheduleApi";
import { useState } from "react";

const getDatesByWeekdays = (startDate, endDate, targetWeekdays) => {
  const result = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    if (targetWeekdays.includes(current.getDay())) {
      result.push(new Date(current)); // Date 객체 그대로 저장
    }
    current.setDate(current.getDate() + 1);
  }
  return result;
};

const getDatesDaily = (startDate, endDate, interval = 1) => {
  const result = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  // 자정 정규화(옵션) — 날짜 비교 안정성
  current.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  while (current <= end) {
    result.push(new Date(current));
    current.setDate(current.getDate() + interval);
  }
  return result;
};

const DisplaySchedules = ({ week }) => {
  const [scheduleListData, setScheduleListData] = useState();

  useEffect(() => {
    const getScheduleList = async () => {
      const res = await fetchGetScheduleList();
      setScheduleListData(res);
    };
    getScheduleList();
  }, []);

  const scheduleList = [];

  scheduleListData?.forEach((schedule) => {
    const startDate = toDate(schedule.start_period);
    const endDate = toDate(schedule.end_period);

    const isInThisWeek = (date) =>
      week.some(
        (d) =>
          d.date === date.getDate() &&
          (d.month == null || d.month === date.getMonth() + 1) &&
          (d.year == null || d.year === date.getFullYear())
      );

    // ✅ 반복 일정 처리
    if (schedule.is_recurrence && schedule.recurrence_rule) {
      const rule = schedule.recurrence_rule;
      const weekdaysMap = { 일: 0, 월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6 };
      const targetWeekdays =
        rule.weekdays?.map((w) => weekdaysMap[w.code]) || [];

      const isDaily = rule.recurrence_type === "DAILY";

      const recurrenceDates = isDaily
        ? getDatesDaily(startDate, endDate)
        : getDatesByWeekdays(startDate, endDate, targetWeekdays);

      recurrenceDates.forEach((date) => {
        // const isStartDate = week.some((d) => d.date === date.getDate());
        scheduleList.push({
          id: `${schedule.id}-${date.toISOString()}`,
          start: date,
          end: date,
          priorityColor: getBackgroundColorOfPriority(schedule.priority),
          title: schedule.title,
          category: getCategoryEmoji(schedule.category_code),
          isStart: isInThisWeek(date),
          isEnd: isInThisWeek(date),
        });
      });
    } else {
      // ✅ 일반 일정 처리
      const isStartDate = isInThisWeek(startDate);
      const isEndDate = isInThisWeek(endDate);

      scheduleList.push({
        id: schedule.id,
        start: startDate,
        end: endDate,
        priorityColor: getBackgroundColorOfPriority(schedule.priority),
        title: schedule.title,
        category: getCategoryEmoji(schedule.category_code),
        isStart: isStartDate,
        isEnd: isEndDate,
      });
    }
  });

  scheduleList?.sort(
    (a, b) => b.end - b.start - (a.end - a.start) || a.start - b.start
  );

  const filteredScheduleList = scheduleList?.filter(
    (schedule) => schedule.isStart === true || schedule.isEnd === true
  );

  console.log(filteredScheduleList);

  return (
    <div className="w-full absolute top-[30px] grid grid-cols-7 gap-1">
      {filteredScheduleList?.map((schedule, index) => (
        <button
          key={schedule.id}
          className={`h-[20px] ${schedule.priorityColor} text-sm truncate px-2
          ${
            schedule.isStart
              ? COL_START[new Date(schedule.start).getDay()] + " rounded-l-md"
              : COL_START[0]
          }
          ${
            schedule.isEnd
              ? COL_END[new Date(schedule.end).getDay() + 1] + " rounded-r-md"
              : COL_END[7]
          }
          ${filteredScheduleList.length > 7 ? ROW_START[index] : ROW_START[0]}
          `}
        >
          {/* {console.log(schedule.start, index)} */}
          {schedule.category + schedule.title}
        </button>
      ))}
    </div>
  );
};

export default DisplaySchedules;
