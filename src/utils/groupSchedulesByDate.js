// 일정 배열을 날짜별로 그룹핑 { "YYYY-MM-DD": [일정, ...], ... }
function groupSchedulesByDate(schedules) {
  return schedules.reduce((groups, schedule) => {
    const date = schedule.start_time.slice(0, 10); // ISO 날짜 형식 앞부분
    if (!groups[date]) groups[date] = [];
    groups[date].push(schedule);
    return groups;
  }, {});
}
export default groupSchedulesByDate;
