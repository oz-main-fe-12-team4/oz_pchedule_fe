import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function BookmarkButton() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  const buttonText = isBookmarked ? "찜 완료" : "찜하기";

  return (
    <button className="..." title={buttonText} onClick={handleClick}>
      ...
    </button>
  );
}
