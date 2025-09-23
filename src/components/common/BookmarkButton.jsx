import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function BookmarkButton() {
  const [isBookmarked, setIsBookmarked] = useState(false); // 초기 상태를 false로 설정

  const handleClick = () => {
    // 클릭할 때마다 상태를 반전시킵니다.
    setIsBookmarked(!isBookmarked);
  };

  const buttonText = isBookmarked ? "찜 완료" : "찜하기";

  return (
    <button
      className="bg-transparent border-none p-1.5 inline-flex items-center justify-center space-x-1 cursor-pointer"
      title={buttonText}
      onClick={handleClick} // 클릭 이벤트 핸들러를 연결합니다.
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
