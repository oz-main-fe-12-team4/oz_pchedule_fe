export const groupDatesByWeek = (firstDay, lastDay) => {
  let currentDay = new Date(firstDay);
  let week = [];
  const weeks = [];
  const dayOfFirstDay = firstDay.getDay();
  const dayOfLastDay = lastDay.getDay();

  if (dayOfFirstDay !== 0) {
    for (let i = 0; i < dayOfFirstDay; i++) {
      week.push({
        month: "",
        date: "",
      });
    }
  }

  while (currentDay <= lastDay) {
    week.push({
      month: currentDay.getMonth() + 1,
      date: currentDay.getDate(),
    });

    if (week.length === 7 || currentDay.getDay() === 6) {
      weeks.push(week);
      week = [];
    }
    currentDay.setDate(currentDay.getDate() + 1);
  }

  if (week.length > 0) {
    // 마지막주 처리 (마지막 날이 토요일이 아닐때)
    for (let i = 6 - dayOfLastDay; i > 0; i--) {
      week.push({
        month: "",
        date: "",
      });
    }
    weeks.push(week);
  }
  return weeks;
};
