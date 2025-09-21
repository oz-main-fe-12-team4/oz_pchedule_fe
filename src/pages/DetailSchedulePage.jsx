import React from "react";
import DetailScheduleCard from "../components/DetailScheduleCard";
import TimeCard from "../components/TimeCard";
// import { CiCirclePlus } from "react-icons/ci"; // 더 이상 CiCirclePlus는 안 쓸 거야!
import { FaRegPlusSquare } from "react-icons/fa"; // <--- 모서리 각진 플러스 아이콘으로 변경!

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

        {/* 오른쪽 하단 추가하기 버튼 (FaRegPlusSquare 아이콘으로 변경) */}
        <button
          type="button"
          onClick={handleAddClick}
          className="absolute bottom-5 right-1 flex items-center gap-1 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <FaRegPlusSquare size={20} />
          {/* <--- FaRegPlusSquare 아이콘으로 변경! */}
        </button>
      </div>
    </div>
  );
}

export default DetailSchedulePage;
