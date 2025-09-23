import React from "react";
import DetailScheduleCard from "../components/DetailScheduleCard";
import TimeCard from "../components/common/TimeCard";
import PlusButton from "../components/common/PlusButton";
import myScheduleData from "../assets/data/dummyDetailSchedule";

function DetailSchedulePage() {
  const { data } = myScheduleData;
  const scheduleList = data.schedule.map(
    ({ id, title, description, start_time, end_time }) => ({
      id,
      title,
      description,
      time: `${start_time.slice(0, 5)}~${end_time.slice(0, 5)}`,
    })
  );

  const handleAddClick = () => {
    console.log("항목추가 버튼 클릭 (기능 없음)");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6 flex items-center gap-2">
        {data.title} {/* 동적으로 데이터에서 받아온 제목 */}
      </h1>

      <div className="relative flex flex-col">
        {/* 점선 */}
        <div
          className="absolute top-5 left-12 h-[calc(100%-2rem)] border-l-4 border-dashed border-gray-400"
          style={{ zIndex: 0 }}
        />

        {/* 일정 카드 리스트 */}
        {scheduleList.map(({ id, time, title, description }) => (
          <div
            key={id}
            className="flex items-center mb-6 last:mb-0 relative z-10"
          >
            <TimeCard time={time} />
            <DetailScheduleCard title={title} description={description} />
          </div>
        ))}

        {/* 플러스 버튼 */}
        <PlusButton onClick={handleAddClick} />
      </div>
    </div>
  );
}

export default DetailSchedulePage;
