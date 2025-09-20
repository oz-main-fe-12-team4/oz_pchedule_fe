import ScheduleCard from "../components/ScheduleCard";
import FilterButtons from "../components/FilterButtons";

const DailyPage = ({ posts }) => {
  const list = posts?.data ?? [];
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-4 text-left">
      <div className="mb-4 text-gray-700">
        <p className="text-2xl mb-1 font-bold">일정</p>
      </div>
      <div className="flex flex-row gap-3 mb-4">
        <FilterButtons keys={["category", "latest", "priority"]} />
      </div>

      <div className="flex flex-row gap-3 mb-4 border-b border-gray-200 pb-2">
        <p>전체</p>
        <p>완료된일</p>
        <p>해야할일</p>
      </div>

      <div className="divide-y-[0.5px] divide-gray-200">
        {list.map((post) => (
          <div key={post.post_id} className="py-4">
            <ScheduleCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyPage;
