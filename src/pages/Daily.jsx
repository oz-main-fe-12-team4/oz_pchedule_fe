import { useState } from "react";
import ScheduleCard from "../components/ScheduleCard";
import FilterButtons from "../components/common/FilterButtons";
import PlusButton from "../components/common/PlusButton";
import TabButton from "../components/common/TabButton";
import AddScheduleModal from "../components/scheduleModal/AddScheduleModal";
import { useEffect } from "react";
import { fetchGetScheduleList } from "../services/scheduleApi";
import useScheduleStore from "../stores/useScheduleStore";

const Daily = () => {
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [scheduleListData, setScheduleListData] = useState();

  useEffect(() => {
    const getScheduleList = async () => {
      const res = await fetchGetScheduleList();
      setScheduleListData(res);
    };
    getScheduleList();
  }, []);

  console.log(scheduleListData);
  scheduleListData?.sort(
    (a, b) => new Date(a.start_period) - new Date(b.start_period)
  );

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
        {scheduleListData?.map((schedule) => (
          <div key={schedule.id} className="py-4">
            <ScheduleCard schedule={schedule} />
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
