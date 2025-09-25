// 날짜 문자열("YYYY-MM-DD") 받아 "월.일 요일" 반환
function formatDateAndDay(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return "날짜 오류";
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const daysKor = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = daysKor[date.getDay()];

  return `${month}.${day} ${dayName}`;
}
export default formatDateAndDay;
