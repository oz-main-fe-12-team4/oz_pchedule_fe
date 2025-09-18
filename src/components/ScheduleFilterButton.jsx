import React, { useState } from "react";
import { FaShareAlt, FaUser } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { Button } from "./Button";

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

const FILTERS = {
  category: { label: "카테고리", options: categoryOptionList },
  priority: { label: "중요도", options: priorityOptionList },
  share: { label: "공유", options: shareOption },
  repeat: { label: "반복", options: repeatOptionList },
};

const ModalMenuList = ({ filterType, value, onChange, isOpen, onToggle }) => {
  const handleSelect = (v) => {
    onChange(v);
    onToggle(false);
  };

  const currentFilter = FILTERS[filterType];

  return (
    <div className="relative">
      <Button
        variant="category"
        onClick={() => onToggle(!isOpen)}
        type="button"
      >
        {currentFilter.label}
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-[360px] rounded-2xl bg-white p-5 shadow-md animate-[slide-up_160ms_ease-out] max-h-[70vh] overflow-auto">
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            {currentFilter.options.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`flex items-center gap-2 text-left text-lg font-semibold rounded-md px-2 py-1 transition-colors
                  ${
                    value === opt.value
                      ? "bg-[#CAE8F2] text-[#223F43]"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                role="option"
                aria-selected={value === opt.value}
              >
                {opt.icon && <span className="text-[#223F43]">{opt.icon}</span>}
                {opt.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <style>{`
        @keyframes slide-up { from { transform: translateY(8%); opacity:.6 } to { transform: translateY(0); opacity:1 } }
      `}</style>
    </div>
  );
};

export const ScheduleFilterButton = ({ filteredList = [] }) => {
  const [filters, setFilters] = useState({
    category: "daily",
    priority: "medium",
    share: "personalSchedule",
    repeat: "none",
  });

  const [openFilter, setOpenFilter] = useState(null);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const getProcessedFilterList = () => {
    const copyList = JSON.parse(JSON.stringify(filteredList));
    const filtered = copyList.filter((it) => {
      const okCategory = !filters.category || it.category === filters.category;
      const okPriority = !filters.priority || it.priority === filters.priority;
      const okShare =
        filters.share === "personalSchedule"
          ? it.isShared === false
          : it.isShared === true;
      const okRepeat = !filters.repeat || it.repeat === filters.repeat;
      return okCategory && okPriority && okShare && okRepeat;
    });
    console.log(filtered);
    return filtered;
  };

  return (
    <div className="flex">
      {/* 필터링 버튼 */}
      <div className="flex w-[300px] gap-2 shrink-0">
        {Object.keys(FILTERS).map((filterKey) => (
          <div key={filterKey}>
            <ModalMenuList
              filterType={filterKey}
              value={filters[filterKey]}
              onChange={(value) => handleFilterChange(filterKey, value)}
              isOpen={openFilter === filterKey}
              onToggle={(open) => setOpenFilter(open ? filterKey : null)}
            />
          </div>
        ))}
      </div>
      {/* 모달 옵션 */}
      <div className="flex-1 mt-4 space-y-2">
        {getProcessedFilterList().map((it) => (
          <div
            key={it.id}
            className="rounded-lg bg-gray-100 p-3 text-gray-800 shadow"
          >
            {it.content}
          </div>
        ))}
      </div>
    </div>
  );
};
