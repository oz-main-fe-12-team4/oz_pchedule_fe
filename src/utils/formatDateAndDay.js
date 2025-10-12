export function formatDateAndDay(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return "날짜 오류";
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const daysKor = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = daysKor[date.getDay()];

  return `${month}.${day} ${dayName}`;
}

export const WEEKDAYS_KR = ["일", "월", "화", "수", "목", "금", "토"];
