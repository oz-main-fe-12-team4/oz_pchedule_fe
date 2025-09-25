import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function LikeButton({ size = 20 }) {
  // 좋아요 상태만 관리
  const [isLiked, setIsLiked] = useState(false);

  // 클릭 시 상태를 안전하게 토글하는 함수
  const handleClick = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <button
      className="bg-transparent border-none inline-flex items-center justify-center space-x-1 cursor-pointer"
      title={isLiked ? "좋아요 취소" : "좋아요"}
      onClick={handleClick}
    >
      {isLiked ? (
        <FaHeart size={size} className="text-red-500" />
      ) : (
        <FaRegHeart size={size} className="text-gray-400" />
      )}
    </button>
  );
}
