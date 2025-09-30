// components/common/LikeButton.jsx
import { useState, useCallback } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDebounce } from "../../hooks/useDebounce"; // 유지
import { likeSchedule, unlikeSchedule } from "../../services/likeApi";

export default function LikeButton({
  size = 20,
  scheduleId,
  onMessage, // 선택: 메시지 토스트 핸들러
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // 디바운스는 상태 변화를 살짝 늦춰 사이드이펙트 제어(실제 호출은 클릭 시점에만 수행)
  useDebounce(isLiked, 300);

  const handleClick = useCallback(async () => {
    if (loading) return;

    const id = typeof scheduleId === "string" ? scheduleId.trim() : scheduleId;
    if (!id) {
      alert("scheduleId가 없습니다.");
      return;
    }

    setLoading(true);
    const prev = isLiked;
    setIsLiked(!prev); // 낙관적 업데이트

    try {
      const data = prev
        ? await unlikeSchedule(id) // true -> false
        : await likeSchedule(id); // false -> true

      if (data?.message) {
        onMessage ? onMessage(data.message) : alert(data.message);
      }
    } catch (e) {
      // 실패 롤백
      setIsLiked(prev);
      console.error("[LikeButton] API error:", e);
      alert(e?.message || "요청 실패");
    } finally {
      setLoading(false);
    }
  }, [loading, scheduleId, isLiked, onMessage]);

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-transparent border-none inline-flex items-center gap-1"
      aria-pressed={isLiked}
      title={isLiked ? "좋아요 취소" : "좋아요"}
    >
      {isLiked ? (
        <FaHeart size={size} className="text-red-500" />
      ) : (
        <FaRegHeart size={size} className="text-gray-400" />
      )}
    </button>
  );
}
