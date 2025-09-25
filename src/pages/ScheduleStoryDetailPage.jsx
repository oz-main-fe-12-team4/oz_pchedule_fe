// src/pages/ScheduleStoryDetailPage.jsx

import React from "react";
import TimeCard from "../components/TimeCard";
import DetailScheduleCard from "../components/DetailScheduleCard";
import LikeButton from "../components/LikeButton";
import BookmarkButton from "../components/BookmarkButton";
import myScheduleData from "../assets/data/dummyDetailSchedule";
import { PiSirenDuotone } from "react-icons/pi";
import { IoChevronBackSharp } from "react-icons/io5";

// ① 날짜와 요일 포맷 함수 추가 — 위의 코드와 동일
function formatStartPeriod(startPeriod) {
  const date = new Date(startPeriod);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const daysKor = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = daysKor[date.getDay()];
  return `${month}.${day} ${dayName}`;
}
const getDayN = (start, end) => {
  // 1. 처음 날짜랑 끝나는 날짜 가져옴( new Date로 가져오는건 하루가 지나는걸 체크하기 위함)
  const startDate = new Date(start);
  const endDate = new Date(end);

  const result = []; // 실제 Day1, Day2... 들어갈 배열
  let dayCount = 1; // 하루가 지날때마다 증가하는 변수

  // 하루가 증가할때마다 dayCount 증가하면서 result 배열에 Day1, Day2가 들어가는 반복문
  for (let d = startDate; d < endDate; d.setDate(d.getDate() + 1)) {
    result.push(`Day ${dayCount}`);
    dayCount++;
  }
  return result;
};

export default function ScheduleStoryDetailPage() {
  const { data } = myScheduleData;
  // ② start_period에서 날짜와 요일 정보 추출
  const formattedStartPeriod = formatStartPeriod(data.start_period);
  const formattedDayN = getDayN(data.start_period, data.end_period);
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
                {data.like_count}
              </span>
            </div>
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
            onClick={() => {
              // 클릭 시 할 동작 넣어라~
            }}
          >
            <PiSirenDuotone className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ④ 제목과 첫번째 타임카드 사이에 날짜, 요일, Day 텍스트 추가 */}
      <div className="mb-4 flex items-center space-x-2 text-lg font-semibold">
        <span>{formattedDayN[2]}</span>

        <span className="text-gray-600">{formattedStartPeriod}</span>
      </div>

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
      </div>
    </div>
  );
}
