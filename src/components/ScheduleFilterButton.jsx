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

const ModalMenuList = ({
  name,
  optionList,
  onChange,
  value,
  isOpen,
  onToggle,
}) => {
  const handleSelect = (v) => {
    onChange(v);
    onToggle(false);
  };

  return (
    <div className="relative">
      <Button
        variant="category"
        onClick={() => onToggle(!isOpen)}
        type="button"
      >
        {name}
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-[360px] rounded-2xl bg-white p-5 shadow-md animate-[slide-up_160ms_ease-out] max-h-[70vh] overflow-auto">
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            {optionList.map((opt) => (
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
  const [categoryType, setCategoryType] = useState("daily");
  const [priorityType, setPriorityType] = useState("medium");
  const [shareType, setShareType] = useState("personalSchedule");
  const [repeatType, setRepeatType] = useState("none");

  // 어떤 패널이 열려있는지 확인
  const [openFilter, setOpenFilter] = useState(null);

  const getProcessedFilterList = () => {
    const copyList = JSON.parse(JSON.stringify(filteredList));
    const filtered = copyList.filter((it) => {
      const okCategory = !categoryType || it.category === categoryType;
      const okPriority = !priorityType || it.priority === priorityType;
      const okShare =
        shareType === "personalSchedule"
          ? it.isShared === false
          : it.isShared === true;
      const okRepeat = !repeatType || it.repeat === repeatType;
      return okCategory && okPriority && okShare && okRepeat;
    });
    console.log(filtered);
    return filtered;
  };

  return (
    <div className="flex">
      {/* 필터링 버튼 그룹 */}
      <div className="flex w-[300px] gap-2 shrink-0">
        <div>
          <ModalMenuList
            name="카테고리"
            value={categoryType}
            onChange={setCategoryType}
            optionList={categoryOptionList}
            isOpen={openFilter === "category"}
            onToggle={(open) => setOpenFilter(open ? "category" : null)}
          />
        </div>

        <div>
          <ModalMenuList
            name="중요도"
            value={priorityType}
            onChange={setPriorityType}
            optionList={priorityOptionList}
            isOpen={openFilter === "priority"}
            onToggle={(open) => setOpenFilter(open ? "priority" : null)}
          />
        </div>

        <div>
          <ModalMenuList
            name="공유"
            value={shareType}
            onChange={setShareType}
            optionList={shareOption}
            isOpen={openFilter === "share"}
            onToggle={(open) => setOpenFilter(open ? "share" : null)}
          />
        </div>

        <div>
          <ModalMenuList
            name="반복"
            value={repeatType}
            onChange={setRepeatType}
            optionList={repeatOptionList}
            isOpen={openFilter === "repeat"}
            onToggle={(open) => setOpenFilter(open ? "repeat" : null)}
          />
        </div>
      </div>

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
