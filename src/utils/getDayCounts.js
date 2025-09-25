// 시작일부터 종료일까지 Day N 배열 생성
function getDayCounts(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const dayCounts = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dayCounts.push(`Day ${dayCounts.length + 1}`);
  }
  return dayCounts;
}
export default getDayCounts;
