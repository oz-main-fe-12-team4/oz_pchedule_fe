import React from "react";
import { FaUser } from "react-icons/fa6";
import { IoShare } from "react-icons/io5";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";

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

const ScheduleCard = ({ post }) => {
  const { priority, start_time, is_shared, title, is_completed, schedule } =
    post;

  return (
    <div
      className={`flex items-center gap-4 border-l-4 ${getColor(
        priority
      )} pl-3 py-2`}
    >
      {/* 왼쪽: 날짜 + 아이콘 */}
      <div className="flex flex-col items-start min-w-[140px]">
        <p className="text-l font-bold text-gray-700 flex items-center gap-2">
          {start_time ? new Date(start_time).toLocaleDateString("ko-KR") : "-"}
          {is_shared ? (
            <IoShare className="text-gray-500" />
          ) : (
            <FaUser className="text-gray-500" />
          )}
        </p>
      </div>

      {/* 오른쪽: 일정 내용 */}
      <div className="flex w-full justify-between items-center gap-4">
        <div className="flex flex-col items-start justify-start p-3 px-6 gap-2 bg-white rounded-xl shadow-sm w-full">
          <p className="font-bold text-gray-800 cursor-pointer">{title}</p>
          <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            {is_completed ? <FaCheckSquare /> : <FaRegSquare />}
            <span>{schedule}</span>
          </div>
        </div>

        <TbTrash
          size={30}
          className="cursor-pointer text-[#d9d9d9] hover:text-[#5C5C5C]"
        />
      </div>
    </div>
  );
};

export default ScheduleCard;
