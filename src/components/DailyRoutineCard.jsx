import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { getColorOfPriority } from "../utils/getColorOfPriority.js";
import { getCategoryEmoji } from "../utils/getCategoryEmoji.js";

const DailyRoutineCard = ({ schedule }) => {
  const { priority, category_name, title, is_completed } = schedule;
  const priorityColor = getColorOfPriority(priority);
  const categoryEmoji = getCategoryEmoji(category_name);

  return (
    <div
      className={`w-full flex justify-between items-center text-sm px-2 ml-1 border-l-4 ${priorityColor} cursor-pointer`}
    >
      <span className="truncate">
        {categoryEmoji} {title}
      </span>
      {is_completed ? <FaCheckSquare /> : <FaRegSquare />}
    </div>
  );
};

export default DailyRoutineCard;
