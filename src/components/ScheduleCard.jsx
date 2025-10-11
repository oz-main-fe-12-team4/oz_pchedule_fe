import React from "react";
import { FaUser } from "react-icons/fa6";
import { IoShare } from "react-icons/io5";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import DeleteButton from "./common/DeleteButton";
import ConfirmModal from "./common/ConfirmModal";
import { useState } from "react";
import { getColorOfPriority } from "../utils/getColorOfPriority";

const ScheduleCard = ({ post }) => {
  const { priority, start_time, share_type, title, is_completed, schedule } =
    post;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const priorityColor = getColorOfPriority(priority);

  const handleClickDeleteButton = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <div
      className={`flex items-center gap-4 border-l-4 ${priorityColor} pl-3 py-2`}
    >
      {/* 왼쪽: 날짜 + 아이콘 */}
      <div className="flex flex-col items-start min-w-[140px]">
        <p className="text-l font-bold text-gray-700 flex items-center gap-2">
          {start_time ? new Date(start_time).toLocaleDateString("ko-KR") : "-"}
          {share_type !== "비공개" ? (
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

        <DeleteButton onClick={handleClickDeleteButton} />
      </div>
      {isConfirmModalOpen && (
        <ConfirmModal
          message={"삭제 하시겠습니까?"}
          leftBtnText={"예"}
          rightBtnText={"아니요"}
          onLeftClick={() => {}}
          onRightClick={() => setIsConfirmModalOpen(false)}
          onClose={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ScheduleCard;
