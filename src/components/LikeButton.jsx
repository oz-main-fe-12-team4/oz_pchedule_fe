import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function LikeButton() {
  const isLiked = true; // UI 테스트를 위해 기본 상태를 '좋아요'로 설정
  const count = 10; // UI 테스트를 위해 좋아요 개수를 10으로 설정

  return (
    <button
      className="bg-transparent border-none p-1.5 inline-flex items-center justify-center space-x-1 cursor-pointer"
      title={isLiked ? "좋아요 취소" : "좋아요"}
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
