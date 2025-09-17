import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false); // 초기 상태를 '좋아요 안 함'으로 설정
  const [count, setCount] = useState(0); // 초기 좋아요 개수를 0으로 설정

  const handleClick = () => {
    // 클릭할 때마다 상태를 반전시킵니다.
    setIsLiked(!isLiked);
    // 좋아요 상태에 따라 개수를 증감시킵니다.
    setCount(isLiked ? count - 1 : count + 1);
  };

  return (
    <button
      className="bg-transparent border-none p-1.5 inline-flex items-center justify-center space-x-1 cursor-pointer"
      title={isLiked ? "좋아요 취소" : "좋아요"}
      onClick={handleClick} // 클릭 이벤트 핸들러를 연결합니다.
    >
      {isLiked ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className="text-gray-400" />
      )}
      <span className="text-sm">{count}</span>
    </button>
  );
}
