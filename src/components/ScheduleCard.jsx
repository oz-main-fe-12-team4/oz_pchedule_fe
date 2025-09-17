import React from "react";
import { FaUser } from "react-icons/fa6";
import { IoShare } from "react-icons/io5";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { posts } from "../assets/data/dummyPostList";

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

export const ScheduleCard = () => {
  // const post = props.post;

  return (
    <div
      className={`flex items-center gap-4 border-l-4 ${getColor(
        posts.priority
      )} pl-3 py-2`}
    >
      {/* 왼쪽: 날짜 + 아이콘 */}
      <div className="flex flex-col items-start min-w-[140px]">
        <p className="text-l font-bold text-gray-700 flex items-center gap-2">
          {new Date(posts.start_time).toLocaleDateString("ko-KR")}
          {posts.is_shared ? (
            <IoShare className="text-gray-500" />
          ) : (
            <FaUser className="text-gray-500" />
          )}
        </p>
      </div>

      {/* 오른쪽: 일정 내용 */}
      <div className="flex w-full justify-between items-center gap-4">
        <div className="flex flex-col items-start justify-start p-3 px-6 gap-2 bg-white rounded-xl shadow-sm w-full">
          {/* 제목 */}
          <p className="font-semibold text-gray-800 cursor-pointer">
            {posts.title}
          </p>

          {/* 체크박스 + 일정항목 */}
          <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            {posts.is_completed ? <FaCheckSquare /> : <FaRegSquare />}
            <span>{posts.schedule}</span>
          </div>
        </div>

        {/* 삭제 아이콘 */}
        <TbTrash
          size={30}
          className="cursor-pointer text-[#d9d9d9] hover:text-[#5C5C5C]"
        />
      </div>
    </div>
  );
};
