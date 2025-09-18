const FILTER_LABELS = {
  category: "카테고리",
  priority: "중요도",
  share: "공유",
  repeat: "반복",
  latest: "최신순",
};

const CATEGORYOPTIONLIST = [
  { value: "daily", name: "🏠 일상" },
  { value: "hobby", name: "🎨 취미/여가" },
  { value: "travel", name: "✈️ 여행" },
  { value: "learning", name: "📚 자기계발/학습" },
  { value: "event", name: "🎉 특별이벤트" },
  { value: "other", name: "🌀 기타" },
];

const PRIORITYOPTIONLIST = [
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

const SHAREOPTION = [
  { value: "personalSchedule", name: "개인일정", icon: <FaUser /> },
  { value: "sharedSchedule", name: "공유하기", icon: <FaShareAlt /> },
];

const REPEATOPTIONLIST = [
  { value: "none", name: "반복없음" },
  { value: "daily", name: "매일반복" },
  { value: "weekly", name: "매주반복" },
  { value: "monthly", name: "매달반복" },
  { value: "yearly", name: "매년반복" },
];

const LATESTOPTIONLIST = [
  { value: "newest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const FILTERS = {
  category: { label: "카테고리", options: CATEGORYOPTIONLIST },
  priority: { label: "중요도", options: PRIORITYOPTIONLIST },
  share: { label: "공유", options: SHAREOPTION },
  repeat: { label: "반복", options: REPEATOPTIONLIST },
  latest: { label: "최신순", options: LATESTOPTIONLIST },
};
