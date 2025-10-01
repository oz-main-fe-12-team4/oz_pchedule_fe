// components/common/LikeButton.jsx
import { useState, useCallback, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// [추가] 좋아요 API 모듈 임포트(공용 인스턴스 사용, 헤더 직접 작성 금지)
import { likeSchedule, unlikeSchedule } from "../../services/likeApi";

// [주의] 너희 프로젝트에서 쓰는 디바운스 훅 경로에 맞게 임포트 유지
import { useDebounce } from "../../hooks/useDebounce";

export default function LikeButton({
  size = 20,
  scheduleId,
  onMessage, // 선택: 서버 메시지 토스트/알림 처리
}) {
  // [기존 유지] 상태값들, 네가 쓰던 변수명 유지
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // [기존 유지] 디바운스 훅 사용(호출 트리거는 클릭 시점, 디바운스는 상태 후속 처리용)
  const debouncedLike = useDebounce(isLiked, 300);

  // [기존 유지] 디바운스된 값 관찰(네가 이미 쓰던 효과라면 그대로 둠)
  useEffect(() => {
    // 여기에 네가 원래 하던 로깅/후속 처리 로직이 있을 수 있음. 건드리지 않음.
    // console.log("debouncedLike:", debouncedLike);
  }, [debouncedLike]);

  // [기존 유지] 클릭 핸들러 (여기에만 최소 추가)
  const handleClick = useCallback(async () => {
    if (loading) return;

    // scheduleId 검증(값 그대로 사용하되, 공백만 안전하게 트리밍)
    const id = typeof scheduleId === "string" ? scheduleId.trim() : scheduleId;
    if (!id) {
      if (typeof window !== "undefined") alert("scheduleId가 없습니다.");
      return;
    }

    setLoading(true);

    // [추가 시작] 좋아요 API 연결 로직 — 기존 토글 흐름을 해치지 않도록 prev 기준으로 분기
    const prev = isLiked; // 클릭 직전 상태를 캡처(분기 기준)
    setIsLiked(!prev); // 낙관적 업데이트: UI 먼저 반응

    try {
      // prev=false → like(POST), prev=true → unlike(DELETE)
      const data = prev
        ? await unlikeSchedule(id) // true -> false
        : await likeSchedule(id); // false -> true

      // 서버 메시지를 우선 사용, 없으면 명세서 기본 문구로 대체
      const fallback = prev
        ? "좋아요가 취소되었습니다."
        : "좋아요에 추가되었습니다.";
      const message = data?.message || fallback;

      if (typeof onMessage === "function") onMessage(message);
      else if (typeof window !== "undefined") alert(message);
    } catch (e) {
      // 실패 시 롤백
      setIsLiked(prev);
      console.error("[LikeButton] 요청 실패:", e);
      if (typeof window !== "undefined") {
        const msg = e?.response?.data?.message || e?.message || "요청 실패";
        alert(msg);
      }
    } finally {
      setLoading(false);
    }
    // [추가 끝] 좋아요 API 연결 로직
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
