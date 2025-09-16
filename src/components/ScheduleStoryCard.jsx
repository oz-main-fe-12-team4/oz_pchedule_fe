function ScheduleStoryCard({ schedule }) {
  return (
    <div className="w-[500px] bg-white rounded-lg shadow p-5 mb-4 cursor-pointer hover:shadow-lg transition">
      {/* 제목 */}
      <h3
        className="text-xl font-semibold mb-3 truncate"
        title={schedule.title}
      >
        {schedule.title}
      </h3>

      {/* 스토리 카드 내용 (요약) */}
      <p className="text-gray-700 mb-4 line-clamp-3">
        {schedule.story || "내용이 없습니다."}
      </p>

      {/* 좋아요 & 찜하기 */}
      <div className="flex space-x-6 text-gray-600 text-sm font-medium">
        <div>👍 좋아요: {schedule.like_count ?? 0}</div>
        <div>💖 찜하기: {schedule.favorite_count ?? 0}</div>
      </div>
    </div>
  );
}
export default ScheduleStoryCard;
