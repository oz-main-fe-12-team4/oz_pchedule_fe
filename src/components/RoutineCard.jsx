import { FaUser } from "react-icons/fa6";
import { IoShare } from "react-icons/io5";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { getRecurrenceType } from "../utils/getRecurrenceType";
import RenderRecurrenceByType from "./RenderRecurrenceByType";
import { getColorOfPriority } from "../utils/getColorOfPriority.js";
import DeleteButton from "./DeleteButton.jsx";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal.jsx";

const RoutineCard = ({ post }) => {
  const { priority, recurrence, start_period, is_shared, title, is_completed } =
    post;
  const priorityColor = getColorOfPriority(priority);
  const recurrenceType = getRecurrenceType(recurrence.type);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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
          {start_period
            ? new Date(start_period).toLocaleDateString("ko-KR")
            : "-"}
          {is_shared ? (
            <IoShare className="text-gray-500" />
          ) : (
            <FaUser className="text-gray-500" />
          )}
        </p>
        <p className="text-sm text-[#C2C2C2]">
          {recurrenceType}반복 :{" "}
          <RenderRecurrenceByType recurrence={recurrence} />
        </p>
      </div>

      {/* 오른쪽: 일정 내용 */}
      <div className="flex w-full justify-between items-center gap-4">
        <div className="flex flex-col items-start justify-start p-3 px-6 gap-2 bg-white rounded-xl shadow-sm w-full">
          <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            {is_completed ? <FaCheckSquare /> : <FaRegSquare />}
            <span>{title}</span>
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

export default RoutineCard;
