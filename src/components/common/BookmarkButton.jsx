import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function BookmarkButton() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleBookmarkClick = () => {
    setIsBookmarked(true); // 한 번 클릭하면 계속 true 유지하도록
  };

  return (
    <button onClick={handleBookmarkClick} aria-label="북마크 버튼">
      {isBookmarked ? (
        <FaBookmark className="text-yellow-400 w-6 h-6" /> // 채워진 노란 북마크
      ) : (
        <FaRegBookmark className="text-gray-400 w-6 h-6" /> // 빈 회색 북마크
      )}
    </button>
  );
}
