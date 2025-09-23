import { posts } from "../assets/data/dummyPostList";
import FilterButtons from "../components/common/FilterButtons";
import ScheduleStoryCard from "../components/ScheduleStoryCard";

const ScheduleStory = () => {
  return (
    <div className="w-full flex flex-col p-4">
      <div className="flex flex-row gap-3 mb-4">
        <FilterButtons keys={["category", "latest", "priority"]} />
      </div>

      <div className="text-sm p-4 border-t border-gray-200 pb-2">
        <p>전체 : {posts.schedule_count}</p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2">
        {posts.data.map((post) => (
          <div key={post.id} className="py-4">
            <ScheduleStoryCard schedule={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleStory;
