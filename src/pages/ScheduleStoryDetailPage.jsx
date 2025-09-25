// src/pages/ScheduleStoryDetailPage.jsx

import React from "react";
import TimeCard from "../components/common/TimeCard";
import DetailScheduleCard from "../components/DetailScheduleCard";
import LikeButton from "../components/common/LikeButton";
import BookmarkButton from "../components/common/BookmarkButton";
import myScheduleData from "../assets/data/dummyDetailSchedule";
import { PiSirenDuotone } from "react-icons/pi";
import { IoChevronBackSharp } from "react-icons/io5";
import formatDateAndDay from "../utils/formatDateAndDay";
import groupSchedulesByDate from "../utils/groupSchedulesByDate";
import getDayCounts from "../utils/getDayCounts";

export default function ScheduleStoryDetailPage() {
  const { data } = myScheduleData;

  // 날짜별 일정 묶기 & 정렬
  const groupedSchedules = groupSchedulesByDate(data.schedule);
  const sortedDates = Object.keys(groupedSchedules);
  // 시작일부터 종료일까지 Day N 배열
  const dayCounts = getDayCounts(data.start_period, data.end_period);

  return (
    <div className="p-4 min-h-screen bg-white text-gray-900">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between mb-6">
        <button
          type="button"
          aria-label="뒤로 가기"
          className="text-2xl font-bold cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
          onClick={() => {}}
        >
          <IoChevronBackSharp />
        </button>

        <h1 className="flex-2 text-left font-semibold text-lg truncate">
          {data.title}
        </h1>

        <div className="flex items-center space-x-4">
          <div className="like-wrapper flex flex-col items-center">
            <LikeButton />
            <span className="text-xs text-gray-600 mt-1">
              {data.like_count}
            </span>
          </div>

          <div className="bookmark-wrapper flex flex-col items-center">
            <BookmarkButton />
            <span className="text-xs text-gray-600 mt-1">
              {data.bookmark_count}
            </span>
          </div>

          <button
            type="button"
            title="신고하기"
            aria-label="신고하기"
            className="cursor-pointer text-gray-700 hover:text-red-600 transition-colors p-1"
            onClick={() => {}}
          >
            <PiSirenDuotone className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* 날짜별 일정 묶어서 렌더링 */}
      {sortedDates.map((date, index) => {
        const schedulesForDate = groupedSchedules[date];
        const dayText = dayCounts[index] || `Day ${index + 1}`;
        const formattedDate = formatDateAndDay(date);

        return (
          <section key={date} className="mb-8">
            {/* Day N ;; 월.일 요일 */}
            <div className="mb-4 flex items-center space-x-2 text-lg font-semibold">
              <span>{dayText}</span>
              <span className="text-gray-600">{formattedDate}</span>
            </div>

            <div className="relative flex flex-col">
              {/* 왼쪽 점선 */}
              <div
                className="absolute top-5 left-12 h-[calc(100%-2rem)] border-l-4 border-dashed border-gray-400"
                style={{ zIndex: 0 }}
              />

              {/* 일정 카드 리스트 */}
              {schedulesForDate.map(
                ({ id, start_time, end_time, title, description }) => (
                  <div
                    key={id}
                    className="flex items-center mb-6 last:mb-0 relative z-10"
                  >
                    <TimeCard
                      time={`${start_time.slice(11, 16)}~${end_time.slice(
                        11,
                        16
                      )}`}
                    />
                    <DetailScheduleCard
                      title={title}
                      description={description}
                    />
                  </div>
                )
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
