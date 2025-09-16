import React, { useRef, useState } from "react";

const categoryOptionList = [
  { value: "daily", name: "🏠 일상" },
  { value: "hobby", name: "🎨 취미/여가" },
  { value: "travel", name: "✈️ 여행" },
  { value: "learning", name: "📚 자기계발/학습" },
  { value: "event", name: "🎉 특별이벤트" },
  { value: "other", name: "🌀 기타" },
];

const priorityOptionList = [
  { value: "urgent", name: "긴급" },
  { value: "high", name: "상" },
  { value: "medium", name: "중" },
  { value: "low", name: "하" },
  { value: "holding", name: "보류" },
];

const shareOption = [
  { value: "personalSchedule", name: "개인일정" },
  { value: "sharedSchedule", name: "공유하기" },
];

const repeatOptionList = [
  { value: "daily", name: "매일반복" },
  { value: "weekly", name: "매주반복" },
  { value: "monthly", name: "매달반복" },
  { value: "yearly", name: "매년반복" },
];

const ModalMenuList = ({ name, optionList, onChange, value }) => {
  const optionRef = useRef(null);
  const handleSelect = (v) => {
    onChange(v);
    if (optionRef.current) {
      optionRef.current.removeAttribute("open");
    }
  };

  return (
    <details ref={optionRef} className="group relative">
      <summary
        className={`block w-full text-center list-none cursor-pointer select-none
          rounded-xl px-3 py-2 text-sm font-semibold shadow-sm
          transition-colors duration-200
          ${
            value
              ? "bg-[#223F43] text-white shadow-md"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
      >
        {name}
      </summary>

      <div
        className="absolute mt-2 w-[360px] rounded-2xl bg-white p-5 shadow-md
                  animate-[slide-up_160ms_ease-out] max-h-[70vh] overflow-auto"
      >
        <div className="grid grid-cols-2 gap-y-6 gap-x-10">
          {optionList.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`text-left text-lg font-semibold rounded-md px-2 py-1 transition-colors
                ${
                  value === opt.value
                    ? "bg-[#CAE8F2] text-[#223F43]"
                    : "hover:bg-gray-100"
                }`}
            >
              {opt.name}
            </div>
          ))}
        </div>
      </div>

      {/*::-webkit-details-marker => summary 앞에 자동으로 붙이는 기본 화살표(▶) 를 없애는 코드 */}
      <style>{`
        details > summary::-webkit-details-marker { display: none; }
        @keyframes slide-up { from { transform: translateY(8%); opacity:.6 } to { transform: translateY(0); opacity:1 } }
      `}</style>
    </details>
  );
};

export const ScheduleFilterButton = ({ filteredList = [] }) => {
  const [categoryType, setCategoryType] = useState("daily");
  const [priorityType, setPriorityType] = useState("medium");
  const [shareType, setShareType] = useState("personalSchedule");
  const [repeatType, setRepeatType] = useState("");

  // const filteredList = [
  //   {
  //     id: 1,
  //     content: "🏠 집안일 하기",
  //     category: "daily",
  //     priority: "medium",
  //     isShared: false,
  //     repeat: "daily",
  //   },
  //   {
  //     id: 2,
  //     content: "✈️ 일본 여행 계획",
  //     category: "travel",
  //     priority: "high",
  //     isShared: true,
  //     repeat: "monthly",
  //   },
  // ];

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
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <ModalMenuList
          name="카테고리"
          value={categoryType}
          onChange={setCategoryType}
          optionList={categoryOptionList}
        />
        <ModalMenuList
          name="중요도"
          value={priorityType}
          onChange={setPriorityType}
          optionList={priorityOptionList}
        />
        <ModalMenuList
          name="공유"
          value={shareType}
          onChange={setShareType}
          optionList={shareOption}
        />
        <ModalMenuList
          name="반복"
          value={repeatType}
          onChange={setRepeatType}
          optionList={repeatOptionList}
        />
      </div>

      <div className="mt-4 space-y-2">
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
