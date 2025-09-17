import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function BookmarkButton() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  const buttonText = isBookmarked ? "찜 완료" : "찜하기";

  return (
    <button
      className="bg-transparent border-none p-1.5 inline-flex items-center justify-center space-x-1 cursor-pointer"
      title={buttonText}
      onClick={handleClick}
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
