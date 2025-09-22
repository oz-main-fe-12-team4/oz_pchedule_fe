function ScheduleStoryCard({ schedule }) {
  return (
    <div
      className="w-[350px] bg-white rounded-lg shadow p-5 mb-4 cursor-pointer hover:shadow-lg transition 
    flex flex-col items-center justify-center text-center"
    >
      {/* 회색 박스 */}
      <div className="bg-gray-300 rounded-md h-32 mb-4 w-[300px]"></div>

      {/* 제목 */}
      <h2
        className="text-xl font-semibold mb-3 truncate"
        title={schedule.title}
      >
        {schedule.title}
      </h2>

      {/* 좋아요 & 찜하기 */}
      <div className="flex space-x-6 text-gray-600 text-sm font-medium justify-center">
        <div> 좋아요: {schedule.like_count ?? 0}</div>
        <div> 찜하기: {schedule.bookmark_count ?? 0}</div>
      </div>
    </div>
  );
}
export default ScheduleStoryCard;
