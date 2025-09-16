function ScheduleStoryCard({ schedule }) {
  return (
    <div className="w-[300px] bg-white rounded-lg shadow p-5 mb-4 cursor-pointer hover:shadow-lg transition">
      {/* 이미지 또는 플레이스홀더 박스 */}
      <div className="bg-gray-300 rounded-md h-32 mb-4 w-full"></div>

      {/* 제목 */}
      <h3
        className="text-xl font-semibold mb-3 truncate"
        title={schedule.title}
      >
        {schedule.title}
      </h3>

      {/* 좋아요 & 찜하기 (이모지로 심플하게) */}
      <div className="flex space-x-6 text-gray-600 text-sm font-medium">
        <div>👍 좋아요: {schedule.like_count ?? 0}</div>
        <div>💖 찜하기: {schedule.favorite_count ?? 0}</div>
      </div>
    </div>
  );
}

export default ScheduleStoryCard;
