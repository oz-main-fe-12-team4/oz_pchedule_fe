import React from "react";
import { FaUser } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { IoShare } from "react-icons/io5";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const posts = {
  post_count: 4,
  data: [
    {
      post_id: 1,
      title: "일본 여행",
      schedule: "일본 맛집 우동집 가기",
      start_time: "2025-10-26T09:00:00",
      category: "여행",
      priority: "상",
      is_shared: true,
      like_count: 12,
      favorite_count: 3,
      is_reported: false,
      is_completed: true,
    },
    {
      post_id: 2,
      title: "일본 여행",
      schedule: "유명 신사 가기",
      start_time: "2025-10-26T14:00:00",
      category: "여행",
      priority: "중",
      is_shared: false,
      like_count: 8,
      favorite_count: 1,
      is_reported: false,
      is_completed: false,
    },
    {
      post_id: 3,
      title: "일본 여행",
      schedule: "꼬치 맛집 가기",
      start_time: "2025-10-27T11:00:00",
      category: "여행",
      priority: "하",
      is_shared: true,
      like_count: 5,
      favorite_count: 0,
      is_reported: false,
      is_completed: false,
    },
    {
      post_id: 4,
      title: "일본 여행",
      schedule: "공원 놀러가기",
      start_time: "2025-10-27T16:00:00",
      category: "여행",
      priority: "보류",
      is_shared: false,
      like_count: 15,
      favorite_count: 4,
      is_reported: false,
      is_completed: true,
    },
  ],
};

const getColor = (priority) => {
  switch (priority) {
    case "긴급":
      return "border-red-500";
    case "상":
      return "border-orange-400";
    case "중":
      return "border-yellow-400";
    case "하":
      return "border-green-400";
    case "보류":
      return "border-blue-300";
    default:
      return "border-gray-200";
  }
};

export const DailyPage = () => {
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
      <div className="flex flex-row gap-3 mb-4">
        <p>전체</p>
        <p>완료된일</p>
        <p>해야할일</p>
      </div>

      <div className="divide-y-[0.5px] divide-gray-200">
        {posts.data.map((it, index) => (
          <div key={index}>
            {/* 위쪽 선 */}
            <div className="border-gray-200 mb-4" />

            {/* 카드 내용 */}
            <div
              className={`flex items-center gap-4 border-l-4 ${getColor(
                it.priority
              )} pl-3 py-2`}
            >
              {/* 왼쪽: 날짜 + 아이콘 */}
              <div className="flex flex-col items-start min-w-[140px]">
                <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  {new Date(it.start_time).toLocaleDateString("ko-KR")}
                  {it.is_shared ? (
                    <IoShare className="text-gray-500" />
                  ) : (
                    <FaUser className="text-gray-500" />
                  )}
                </p>
              </div>

              <div className="flew w-full justify-between">
                {/* 오른쪽: 일정 내용 */}
                <div className="flex w-full flex-col items-start justify-start p-3 px-6 gap-2 bg-white rounded-xl shadow-sm">
                  {/* 제목 */}
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">{it.title}</p>
                  </div>

                  {/* 체크박스 + 태스크 */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {it.is_completed ? <FaCheckSquare /> : <FaRegSquare />}
                    <span>{it.schedule}</span>
                  </div>
                </div>
              </div>
              <TbTrash size={30} />
            </div>

            {/* 아래쪽 선 */}
            <div className="border-b border-gray-200 mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};
import React from "react";
import { FaUser } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { IoShare } from "react-icons/io5";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const posts = {
  post_count: 4,
  data: [
    {
      post_id: 1,
      title: "일본 여행",
      schedule: "일본 맛집 우동집 가기",
      start_time: "2025-10-26T09:00:00",
      category: "여행",
      priority: "상",
      is_shared: true,
      like_count: 12,
      favorite_count: 3,
      is_reported: false,
      is_completed: true,
    },
    {
      post_id: 2,
      title: "일본 여행",
      schedule: "유명 신사 가기",
      start_time: "2025-10-26T14:00:00",
      category: "여행",
      priority: "중",
      is_shared: false,
      like_count: 8,
      favorite_count: 1,
      is_reported: false,
      is_completed: false,
    },
    {
      post_id: 3,
      title: "일본 여행",
      schedule: "꼬치 맛집 가기",
      start_time: "2025-10-27T11:00:00",
      category: "여행",
      priority: "하",
      is_shared: true,
      like_count: 5,
      favorite_count: 0,
      is_reported: false,
      is_completed: false,
    },
    {
      post_id: 4,
      title: "일본 여행",
      schedule: "공원 놀러가기",
      start_time: "2025-10-27T16:00:00",
      category: "여행",
      priority: "보류",
      is_shared: false,
      like_count: 15,
      favorite_count: 4,
      is_reported: false,
      is_completed: true,
    },
  ],
};

const getColor = (priority) => {
  switch (priority) {
    case "긴급":
      return "border-red-500";
    case "상":
      return "border-orange-400";
    case "중":
      return "border-yellow-400";
    case "하":
      return "border-green-400";
    case "보류":
      return "border-blue-300";
    default:
      return "border-gray-200";
  }
};

export const DailyPage = () => {
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
      <div className="flex flex-row gap-3 mb-4">
        <p>전체</p>
        <p>완료된일</p>
        <p>해야할일</p>
      </div>

      <div className="divide-y-[0.5px] divide-gray-200">
        {posts.data.map((it, index) => (
          <div key={index}>
            {/* 위쪽 선 */}
            <div className="border-gray-200 mb-4" />

            {/* 카드 내용 */}
            <div
              className={`flex items-center gap-4 border-l-4 ${getColor(
                it.priority
              )} pl-3 py-2`}
            >
              {/* 왼쪽: 날짜 + 아이콘 */}
              <div className="flex flex-col items-start min-w-[140px]">
                <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  {new Date(it.start_time).toLocaleDateString("ko-KR")}
                  {it.is_shared ? (
                    <IoShare className="text-gray-500" />
                  ) : (
                    <FaUser className="text-gray-500" />
                  )}
                </p>
              </div>

              <div className="flew w-full justify-between">
                {/* 오른쪽: 일정 내용 */}
                <div className="flex w-full flex-col items-start justify-start p-3 px-6 gap-2 bg-white rounded-xl shadow-sm">
                  {/* 제목 */}
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">{it.title}</p>
                  </div>

                  {/* 체크박스 + 태스크 */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {it.is_completed ? <FaCheckSquare /> : <FaRegSquare />}
                    <span>{it.schedule}</span>
                  </div>
                </div>
              </div>
              <TbTrash size={30} />
            </div>

            {/* 아래쪽 선 */}
            <div className="border-b border-gray-200 mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};
import React from "react";
import { FaUser } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { IoShare } from "react-icons/io5";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const posts = {
  post_count: 4,
  data: [
    {
      post_id: 1,
      title: "일본 여행",
      schedule: "일본 맛집 우동집 가기",
      start_time: "2025-10-26T09:00:00",
      category: "여행",
      priority: "상",
      is_shared: true,
      like_count: 12,
      favorite_count: 3,
      is_reported: false,
      is_completed: true,
    },
    {
      post_id: 2,
      title: "일본 여행",
      schedule: "유명 신사 가기",
      start_time: "2025-10-26T14:00:00",
      category: "여행",
      priority: "중",
      is_shared: false,
      like_count: 8,
      favorite_count: 1,
      is_reported: false,
      is_completed: false,
    },
    {
      post_id: 3,
      title: "일본 여행",
      schedule: "꼬치 맛집 가기",
      start_time: "2025-10-27T11:00:00",
      category: "여행",
      priority: "하",
      is_shared: true,
      like_count: 5,
      favorite_count: 0,
      is_reported: false,
      is_completed: false,
    },
    {
      post_id: 4,
      title: "일본 여행",
      schedule: "공원 놀러가기",
      start_time: "2025-10-27T16:00:00",
      category: "여행",
      priority: "보류",
      is_shared: false,
      like_count: 15,
      favorite_count: 4,
      is_reported: false,
      is_completed: true,
    },
  ],
};

const getColor = (priority) => {
  switch (priority) {
    case "긴급":
      return "border-red-500";
    case "상":
      return "border-orange-400";
    case "중":
      return "border-yellow-400";
    case "하":
      return "border-green-400";
    case "보류":
      return "border-blue-300";
    default:
      return "border-gray-200";
  }
};

export const DailyPage = () => {
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
      <div className="flex flex-row gap-3 mb-4">
        <p>전체</p>
        <p>완료된일</p>
        <p>해야할일</p>
      </div>

      <div className="divide-y-[0.5px] divide-gray-200">
        {posts.data.map((it, index) => (
          <div key={index}>
            {/* 위쪽 선 */}
            <div className="border-gray-200 mb-4" />

            {/* 카드 내용 */}
            <div
              className={`flex items-center gap-4 border-l-4 ${getColor(
                it.priority
              )} pl-3 py-2`}
            >
              {/* 왼쪽: 날짜 + 아이콘 */}
              <div className="flex flex-col items-start min-w-[140px]">
                <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  {new Date(it.start_time).toLocaleDateString("ko-KR")}
                  {it.is_shared ? (
                    <IoShare className="text-gray-500" />
                  ) : (
                    <FaUser className="text-gray-500" />
                  )}
                </p>
              </div>

              <div className="flew w-full justify-between">
                {/* 오른쪽: 일정 내용 */}
                <div className="flex w-full flex-col items-start justify-start p-3 px-6 gap-2 bg-white rounded-xl shadow-sm">
                  {/* 제목 */}
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">{it.title}</p>
                  </div>

                  {/* 체크박스 + 태스크 */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {it.is_completed ? <FaCheckSquare /> : <FaRegSquare />}
                    <span>{it.schedule}</span>
                  </div>
                </div>
              </div>
              <TbTrash size={30} />
            </div>

            {/* 아래쪽 선 */}
            <div className="border-b border-gray-200 mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};
