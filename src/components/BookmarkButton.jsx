import { useEffect, useRef, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { toggleBookmarkApi } from "../api/bookmark";

/**
 * BookmarkButton
 * props:
 *  - itemId: number|string (필수)     -> 찜할 항목 id
 *  - initialBookmarked: boolean        -> 초기 찜 여부
 *  - onToggle: function(newState)      -> 상태 변경 콜백 (선택)
 *  - disabled: boolean                 -> 외부에서 비활성화 할 때 사용
 *  - className: string                 -> 추가 클래스
 *  - debounceMs: number                -> API 호출 디바운스(ms), 기본 200
 */
export default function BookmarkButton({
  itemId,
  initialBookmarked = false,
  onToggle,
  disabled = false,
  className = "",
  debounceMs = 200,
}) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  // 내부 타이머 ref (debounce)
  const timerRef = useRef(null);

  // unmount 표시 (안전한 상태 업데이트 위해)
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // 부모가 initialBookmarked를 나중에 변경할 수 있으므로 동기화
  useEffect(() => {
    setBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  // 실제 API 호출 함수 (롤백 처리 포함)
  const callApi = async (id, nextState) => {
    setLoading(true);
    try {
      await toggleBookmarkApi(id, nextState);

      // 실패하면 optimistic 롤백
      if (isMounted.current) {
        setBookmarked((prev) => !prev);
      }
      console.error("북마크 업데이트 실패:", err);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  // 디바운스 래퍼: debounceMs가 바뀌면 기존 타이머는 자동 처리됨 (새 클릭시 clear)
  const debouncedCallApi = (id, nextState) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      callApi(id, nextState);
    }, debounceMs);
  };

  const handleClick = (e) => {
    e?.preventDefault();
    if (disabled || loading) return;

    const next = !bookmarked;
    // optimistic UI 먼저 반영
    setBookmarked(next);
    if (onToggle) onToggle(next);

    // debounce된 API 호출
    debouncedCallApi(itemId, next);
  };

  return (
    <button
      aria-pressed={bookmarked}
      aria-label={bookmarked ? "찜 취소" : "찜하기"}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`bookmark-button ${className}`}
      style={{
        background: "transparent",
        border: "none",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        padding: 6,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      title={bookmarked ? "찜 취소" : "찜하기"}
    >
      {bookmarked ? (
        <FaBookmark style={{ color: "#f59e0b" }} aria-hidden />
      ) : (
        <FaRegBookmark style={{ color: "#9ca3af" }} aria-hidden />
      )}
    </button>
  );
}
