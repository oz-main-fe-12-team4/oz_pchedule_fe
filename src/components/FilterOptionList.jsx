import React from "react";
import { FaShareAlt, FaUser } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";

const categoryOptionList = [
  { value: "daily", name: "🏠 일상" },
  { value: "hobby", name: "🎨 취미/여가" },
  { value: "travel", name: "✈️ 여행" },
  { value: "learning", name: "📚 자기계발/학습" },
  { value: "event", name: "🎉 특별이벤트" },
  { value: "other", name: "🌀 기타" },
];

const priorityOptionList = [
  {
    value: "urgent",
    name: "긴급",
    icon: <FaCircle className="text-red-500" />,
  },
  { value: "high", name: "상", icon: <FaCircle className="text-orange-500" /> },
  {
    value: "medium",
    name: "중",
    icon: <FaCircle className="text-yellow-500" />,
  },
  { value: "low", name: "하", icon: <FaCircle className="text-green-500" /> },
  {
    value: "holding",
    name: "보류",
    icon: <FaCircle className="text-blue-400" />,
  },
];

const shareOption = [
  { value: "personalSchedule", name: "개인일정", icon: <FaUser /> },
  { value: "sharedSchedule", name: "공유하기", icon: <FaShareAlt /> },
];

const repeatOptionList = [
  { value: "none", name: "반복없음" },
  { value: "daily", name: "매일반복" },
  { value: "weekly", name: "매주반복" },
  { value: "monthly", name: "매달반복" },
  { value: "yearly", name: "매년반복" },
];

const latestOptionList = [
  { value: "newest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const FILTERS = {
  category: { label: "카테고리", options: categoryOptionList },
  priority: { label: "중요도", options: priorityOptionList },
  share: { label: "공유", options: shareOption },
  repeat: { label: "반복", options: repeatOptionList },
  latest: { label: "최신순", options: latestOptionList },
};

const FilterOptionList = ({ filters, openFilter, onFilterChange, onClose }) => {
  if (!openFilter) return null;

  const current = FILTERS[openFilter];
  const handleSelect = (value) => {
    onFilterChange(openFilter, value);
    onClose();
  };

  return (
    <div>
      <div className="absolute z-10 mt-2 w-[360px] rounded-2xl bg-white p-5 shadow-md animate-[slide-up_160ms_ease-out] max-h-[70vh] overflow-auto">
        <div className="grid grid-cols-2 gap-y-6 gap-x-10">
          {current.options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`flex items-center gap-2 text-left text-lg font-semibold rounded-md px-2 py-1 transition-colors
                ${
                  filters[openFilter] === opt.value
                    ? "bg-[#CAE8F2] text-[#223F43]"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
            >
              {opt.icon && <span className="text-[#223F43]">{opt.icon}</span>}
              {opt.name}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes slide-up { from { transform: translateY(8%); opacity:.6 } to { transform: translateY(0); opacity:1 } }
      `}</style>
    </div>
  );
};

export default FilterOptionList;
