import { useState } from "react";
import ScheduleCard from "../components/ScheduleCard";
import FilterButtons from "../components/common/FilterButtons";
import PlusButton from "../components/common/PlusButton";
import TabButton from "../components/common/TabButton";
import AddScheduleModal from "../components/scheduleModal/AddScheduleModal";
import useScheduleStore from "../stores/useScheduleStore";

const Daily = ({ posts }) => {
  const list = posts?.data ?? [];
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const { clearMainSchedule } = useScheduleStore();

  const handlePlusClick = () => {
    clearMainSchedule();
    setIsAddScheduleOpen(true);
  };
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-4 text-left">
      <div className="flex flex-row gap-3 mt-4">
        <FilterButtons keys={["category", "latest", "priority"]} />
      </div>
      <div className="w-full flex justify-start items-start -mx-4 md:-mx-6 lg:-mx-8">
        <TabButton tabs={["전체", "완료된일", "해야할일"]} />
      </div>
      <div className="divide-y-[0.5px] divide-gray-200">
        {list.map((post) => (
          <div key={post.post_id} className="py-4">
            <ScheduleCard post={post} />
          </div>
        ))}
      </div>
      <PlusButton onClick={handlePlusClick} />
      {isAddScheduleOpen && (
        <AddScheduleModal onClose={() => setIsAddScheduleOpen(false)} />
      )}
    </div>
  );
};

export default Daily;
