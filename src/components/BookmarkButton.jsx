import { useEffect, useRef, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { toggleBookmarkApi } from "../api/bookmark";

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
  const timerRef = useRef(null);

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

  useEffect(() => {
    setBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  const callApi = async (id, nextState) => {
    setLoading(true);
    try {
      await toggleBookmarkApi(id, nextState);
      // ✅ API 호출 성공 시 로직
      // console.log(`북마크 상태가 성공적으로 ${nextState}로 업데이트되었습니다.`);
      // analytics.track('bookmark_toggled', { itemId: id, status: nextState });
    } catch (err) {
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
    setBookmarked(next);
    if (onToggle) onToggle(next);

    debouncedCallApi(itemId, next);
  };

  const buttonClasses = `
    bg-transparent border-none p-1.5 inline-flex items-center justify-center 
    ${bookmarked ? "text-amber-500" : "text-gray-400"}
    ${disabled || loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
    ${className}
  `;

  return (
    <button
      aria-pressed={bookmarked}
      aria-label={bookmarked ? "찜 취소" : "찜하기"}
      onClick={handleClick}
      disabled={disabled || loading}
      className={buttonClasses}
      title={bookmarked ? "찜 취소" : "찜하기"}
    >
      {bookmarked ? <FaBookmark aria-hidden /> : <FaRegBookmark aria-hidden />}
    </button>
  );
}
