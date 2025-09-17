import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function BookmarkButton() {
  const isBookmarked = true; // UI 테스트를 위해 '찜 완료' 상태로 고정
  const buttonText = isBookmarked ? "찜 완료" : "찜하기";

  return (
    <button
      className="bg-transparent border-none p-1.5 inline-flex items-center justify-center space-x-1 cursor-pointer"
      title={buttonText}
    >
      {isBookmarked ? (
        <FaBookmark className="text-amber-500" />
      ) : (
        <FaRegBookmark className="text-gray-400" />
      )}
      <span className="text-sm">{buttonText}</span>
    </button>
  );
}
