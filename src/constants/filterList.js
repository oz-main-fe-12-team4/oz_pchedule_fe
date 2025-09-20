import { FaCircle, FaUser } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";

export const FILTER_LABELS = {
  category: "카테고리",
  priority: "중요도",
  share: "공유",
  repeat: "반복",
  latest: "최신순",
  period: "기간별",
  date: "날짜별",
};

export const CATEGORY_OPTION_LIST = [
  { value: "daily", name: "🏠 일상" },
  { value: "hobby", name: "🎨 취미/여가" },
  { value: "travel", name: "✈️ 여행" },
  { value: "learning", name: "📚 자기계발/학습" },
  { value: "event", name: "🎉 특별이벤트" },
  { value: "other", name: "🌀 기타" },
];

export const PRIORITY_OPTION_LIST = [
  { value: "urgent", name: "긴급", Icon: FaCircle, iconClass: "text-red-500" },
  { value: "high", name: "상", Icon: FaCircle, iconClass: "text-orange-500" },
  { value: "medium", name: "중", Icon: FaCircle, iconClass: "text-yellow-500" },
  { value: "low", name: "하", Icon: FaCircle, iconClass: "text-green-500" },
  {
    value: "holding",
    name: "보류",
    Icon: FaCircle,
    iconClass: "text-blue-400",
  },
];

export const SHARE_OPTION = [
  { value: "personalSchedule", name: "개인일정", Icon: FaUser },
  { value: "sharedSchedule", name: "공유하기", Icon: FaShareAlt },
];

export const REPEAT_OPTION_LIST = [
  { value: "none", name: "반복없음" },
  { value: "daily", name: "매일반복" },
  { value: "weekly", name: "매주반복" },
  { value: "monthly", name: "매달반복" },
  { value: "yearly", name: "매년반복" },
];

export const LATEST_OPTION_LIST = [
  { value: "newest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

export const FILTERS = {
  category: { label: "카테고리", options: CATEGORY_OPTION_LIST },
  priority: { label: "중요도", options: PRIORITY_OPTION_LIST },
  share: { label: "공유", options: SHARE_OPTION },
  repeat: { label: "반복", options: REPEAT_OPTION_LIST },
  latest: { label: "최신순", options: LATEST_OPTION_LIST },
};
