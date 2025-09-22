import React from "react";
import DetailScheduleCard from "../components/DetailScheduleCard";
import TimeCard from "../components/TimeCard";
import PlusButton from "../components/PlusButton";

// scheduleList는 이제 props로 받을 거야!
function DetailSchedulePage({ scheduleList }) {
  const handleAddClick = () => {
    console.log("항목추가 버튼 클릭 (기능 없음)");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span role="img" aria-label="비행기">
          ✈️
        </span>
        일본 여행
      </h1>

      <div className="relative flex flex-col">
        {/* 타임카드 뒤 관통 점선 (위치 조정!) */}
        <div
          className="absolute top-5 left-12 h-[calc(100%-2rem)] border-l-4 border-dashed border-gray-400" // <--- top-5로 살짝 위로 올림!
          style={{ zIndex: 0 }}
        />

        {scheduleList.map(({ time, title, description }, idx) => (
          <div
            key={idx}
            className="flex items-center mb-6 last:mb-0 relative z-10"
          >
            {" "}
            {/* <--- items-center로 변경 */}
            <TimeCard time={time} />
            <DetailScheduleCard title={title} description={description} />
          </div>
        ))}

        {/* 기존 하단 추가하기 버튼 대신 PlusButton 쓰기 */}
        <PlusButton onClick={handleAddClick} />
      </div>
    </div>
  );
}

export default DetailSchedulePage;
