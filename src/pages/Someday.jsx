import { useState } from "react";
import PlusButton from "../components/common/PlusButton";
import TabButton from "../components/common/TabButton";
import AddScheduleModal from "../components/scheduleModal/AddScheduleModal";

const Someday = () => {
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  return (
    <div className="w-full">
      <TabButton tabs={["전체", "내가작성글", "공유스토리"]} />
      <div className="flex items-center justify-center p-8">
        <p
          className="text-gray-400 text-xl mt-5 cursor-pointer"
          onClick={() => setIsAddScheduleOpen(true)}
        >
          + 버튼을 눌러 일정을 등록해보세요.
        </p>
      </div>
      <PlusButton onClick={() => setIsAddScheduleOpen(true)} />
      {isAddScheduleOpen && (
        <AddScheduleModal onClose={() => setIsAddScheduleOpen(false)} />
      )}
    </div>
  );
};

export default Someday;
