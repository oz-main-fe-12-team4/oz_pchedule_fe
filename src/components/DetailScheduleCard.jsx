import { FaPen } from "react-icons/fa6";

function DetailScheduleCard({ title, description, onEdit }) {
  // const handlePenClick = () => {
  //   onEdit?.({ title, description });
  // };

  return (
    <div
      className="bg-[#CAE8F2] rounded-md p-3 ml-4 shadow-sm relative inline-flex flex-col max-w-[90vw] overflow-x-auto"
      style={{ width: "fit-content" }}
    >
      {/* 수정 아이콘 오른쪽 상단 고정 */}
      <button
        type="button"
        onClick={onEdit}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 cursor-pointer"
        aria-label="정보 수정"
        title="정보 수정"
      >
        <FaPen size={16} />
      </button>

      {/* 제목 */}
      <h1 className="font-bold mb-1 pr-8 text-[#192A2D] whitespace-nowrap">
        {title}
      </h1>

      {/* 내용 */}
      <p className="text-sm text-gray-700 pr-8 whitespace-nowrap">
        {description}
      </p>
    </div>
  );
}

export default DetailScheduleCard;
