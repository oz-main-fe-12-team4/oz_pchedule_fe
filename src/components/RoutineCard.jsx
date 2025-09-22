import { FaUser } from "react-icons/fa6";
import { IoShare } from "react-icons/io5";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { getRecurrenceType } from "../utils/getRecurrenceType";
import RenderRecurrenceByType from "./RenderRecurrenceByType";
import { getColorOfPriority } from "../utils/getColorOfPriority.js";

const RoutineCard = ({ post }) => {
  const { priority, recurrence, start_period, is_shared, title, is_completed } =
    post;
  const priorityColor = getColorOfPriority(priority);
  const recurrenceType = getRecurrenceType(recurrence.type);

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

        <TbTrash
          size={30}
          className="cursor-pointer text-[#d9d9d9] hover:text-[#5C5C5C]"
        />
      </div>
    </div>
  );
};

export default RoutineCard;
