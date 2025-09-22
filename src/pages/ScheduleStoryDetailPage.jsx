// src/pages/ScheduleStoryDetailPage.jsx

import React from "react";
import TimeCard from "../components/TimeCard";
import DetailScheduleCard from "../components/DetailScheduleCard";
import LikeButton from "../components/LikeButton";
import BookmarkButton from "../components/BookmarkButton";
import myScheduleData from "../assets/data/dummyDetailSchedule";
import { PiSirenDuotone } from "react-icons/pi";
import { IoChevronBackSharp } from "react-icons/io5";
import dummyCount from "../assets/data/dummyCount";
import dummyToday from "../assets/data/dummyDay";

export default function ScheduleStoryDetailPage() {
  const { data } = myScheduleData;
  const scheduleList = data.schedule.map(
    ({ id, title, description, start_time, end_time }) => ({
      id,
      title,
      description,
      time: `${start_time.slice(0, 5)}~${end_time.slice(0, 5)}`,
    })
  );

  return (
    <div className="p-4 min-h-screen bg-white text-gray-900">
      {/* 최상단 헤더 */}
      <header className="flex items-center justify-between mb-6">
        {/* 뒤로가기 버튼, 클릭 기능 있음 */}
        <button
          type="button"
          aria-label="뒤로 가기"
          className="text-2xl font-bold cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
          onClick={() => {}}
        >
          <IoChevronBackSharp />
        </button>

        {/* 제목 */}
        <h1 className="flex-2 text-left font-semibold text-lg truncate">
          {data.title}
        </h1>

        {/* 좋아요, 북마크 버튼, 신고 아이콘 */}
        <div className="flex items-center space-x-4">
          <div className="like-wrapper">
            {/* 좋아요 버튼 + 숫자 감싸기 */}
            <div className="flex flex-col items-center">
              <LikeButton />
              <span className="text-xs text-gray-600 mt-1">
                {dummyCount.likesCount}
              </span>
            </div>
          </div>

          <div className="bookmark-wrapper flex flex-col items-center">
            <BookmarkButton />
            <span className="text-xs text-gray-600 mt-1">
              {dummyCount.bookmarksCount}
            </span>
          </div>

          <button
            type="button"
            title="신고하기"
            aria-label="신고하기"
            className="cursor-pointer text-gray-700 hover:text-red-600 transition-colors p-1"
            onClick={() => {
              // 클릭 시 할 동작 넣어라~
            }}
          >
            <PiSirenDuotone className="w-6 h-6" />
          </button>
        </div>
      </header>
      <div className="relative flex flex-col">
        {/* 점선 */}
        <div
          className="absolute top-5 left-12 h-[calc(100%-2rem)] border-l-4 border-dashed border-gray-400"
          style={{ zIndex: 0 }}
        />

        <div className="timeline-header">
          <strong>day1</strong>{" "}
          <span className="date text-gray-500">
            {dummyToday.timelineDate} {dummyToday.timelineDay}
          </span>
        </div>

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
      </div>
    </div>
  );
}
