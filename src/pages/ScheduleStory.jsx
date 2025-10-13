import { useLoaderData } from "react-router";
import FilterButtons from "../components/common/FilterButtons";
import ScheduleStoryCard from "../components/ScheduleStoryCard";
import useUserStore from "../stores/userStore";

const ScheduleStory = () => {
  const { isAdmin } = useUserStore();
  const userFilterButtons = ["category", "latest", "period"];
  const adminFilterButtons = ["category", "latest", "period", "reported"];

  const scheduleList = useLoaderData();
  const scheduleStoryList = scheduleList?.filter(
    (schedule) => schedule.share_type === "전체공개"
  );

  return (
    <div className="w-full flex flex-col p-4">
      <div className="flex flex-row gap-3 mb-4">
        <FilterButtons
          keys={isAdmin ? adminFilterButtons : userFilterButtons}
        />
      </div>

      <div className="text-sm p-4 border-t border-gray-200 pb-2">
        <p>전체 : {scheduleStoryList.length}</p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2">
        {scheduleStoryList?.map((schedule) => (
          <div key={schedule.id}>
            <ScheduleStoryCard schedule={schedule} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleStory;
