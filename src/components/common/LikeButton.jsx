// src/components/common/LikeButton.jsx
import { useState, useCallback, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDebounce } from "../../hooks/useDebounce"; // [복구] 디바운스 임포트
import { likeSchedule, unlikeSchedule } from "../../services/likeApi";

export default function LikeButton({ size = 20, scheduleId, onMessage }) {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // [복구 시작] 디바운스 로직 원복
  const debouncedLike = useDebounce(isLiked, 300);
  useEffect(() => {
    // 필요하면 후속 처리/로깅 위치
    // console.log("debouncedLike:", debouncedLike);
  }, [debouncedLike]);
  // [복구 끝]

  const handleClick = useCallback(async () => {
    if (loading) return;

    const id = typeof scheduleId === "string" ? scheduleId.trim() : scheduleId;
    if (!id) {
      if (typeof window !== "undefined") alert("scheduleId가 없습니다.");
      return;
    }

    setLoading(true);

    // [추가 시작] 좋아요 API 연결(낙관적 업데이트 + prev 분기)
    const prev = isLiked; // 클릭 직전 상태 캡처
    setIsLiked(!prev); // UI 먼저 토글

    try {
      const data = prev
        ? await unlikeSchedule(id) // true -> false
        : await likeSchedule(id); // false -> true

      const fallback = prev
        ? "좋아요가 취소되었습니다."
        : "좋아요에 추가되었습니다.";
      const message = data?.message || fallback;

      onMessage ? onMessage(message) : alert(message);
    } catch (e) {
      setIsLiked(prev); // 실패 롤백
      const msg = e?.response?.data?.message || e?.message || "요청 실패";
      if (typeof window !== "undefined") alert(msg);
    } finally {
      setLoading(false);
    }
    // [추가 끝]
  }, [loading, scheduleId, isLiked, onMessage]);

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-transparent border-none inline-flex items-center gap-1"
      aria-pressed={isLiked}
      title={isLiked ? "좋아요 취소" : "좋아요"}
      style={{ cursor: loading ? "not-allowed" : "pointer" }}
    >
      {isLiked ? (
        <FaHeart size={size} className="text-red-500" />
      ) : (
        <FaRegHeart size={size} className="text-gray-400" />
      )}
    </button>
  );
}
