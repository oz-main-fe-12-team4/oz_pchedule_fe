import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function BookmarkButton({ size = 20 }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleBookmarkClick = () => {
    setIsBookmarked(true); // 한 번 클릭하면 계속 true 유지하도록
  };

  return (
    <button onClick={handleBookmarkClick} aria-label="북마크 버튼">
      {isBookmarked ? (
        <FaBookmark size={size} className="text-yellow-400 " /> // 채워진 노란 북마크
      ) : (
        <FaRegBookmark size={size} className="text-gray-400 " /> // 빈 회색 북마크
      )}
    </button>
  );
}
