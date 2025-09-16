import React, { useState } from "react";

const categoryOptionList = [
  { value: "latest", name: "🏠 일상" },
  { value: "latest", name: "🎨 취미/여가" },
  { value: "oldest", name: "✈️ 여행" },
  { value: "oldest", name: "📚 자기계발/학습" },
  { value: "oldest", name: "🎉 특별이벤트" },
  { value: "oldest", name: "🌀 기타" },
];

const priorityOptionList = [
  { value: "red", name: "긴급" },
  { value: "orange", name: "상" },
  { value: "yellow", name: "중" },
  { value: "green", name: "하" },
  { value: "blue", name: "보류" },
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

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

export const FilterButton = ({ filterList = [] }) => {
  const [sortType, setSortType] = useState("latest");

  const getProcessedFilterList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(filterList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={categoryOptionList}
      />
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={priorityOptionList}
      />
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={shareOption}
      />
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={repeatOptionList}
      />
      {getProcessedFilterList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};
