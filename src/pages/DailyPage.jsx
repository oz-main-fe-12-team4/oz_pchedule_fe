import React from "react";
import { ScheduleCard } from "../components/ScheduleCard"; // ⭐ ScheduleCard 불러오기

export const DailyPage = ({ posts }) => {
  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      {/* 기간 */}
      <div className="mb-4 text-gray-700">
        <p className="text-xl font-bold">2025년 10월 26일 ~ 2025년 10월 30일</p>
      </div>

      {/* 카테고리 */}
      <div className="flex flex-row gap-3 mb-4">
        <p>기간별</p>
        <p>날짜별</p>
        <p>중요도</p>
      </div>

      {/* 필터 */}
      <div className="flex flex-row gap-3 mb-4">
        <p>전체</p>
        <p>완료된일</p>
        <p>해야할일</p>
      </div>

      {/* 카드 리스트 */}
      <div className="divide-y-[0.5px] divide-gray-200">
        {posts.data.map((post) => (
          <div key={post.post_id} className="py-4">
            <ScheduleCard post={post} /> {/* ⭐ post props로 넘겨줌 */}
          </div>
        ))}
      </div>
    </div>
  );
};
