// src/components/common/LikeButton.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDebounce } from "../../hooks/useDebounce";

export default function LikeButton({
  size = 20,
  scheduleId,
  apiBase, // 넘겨주면 우선 사용
  token, // 넘겨주면 우선 사용
  onMessage, // 선택: 토스트 핸들러
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debouncedLike = useDebounce(isLiked, 300);

  useEffect(() => {
    // 필요하면 여기서 초기 조회(GET) 붙이면 됨
  }, [debouncedLike]);

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <button
        style={{ padding: 8, cursor: "pointer" }}
        title={isLiked ? "좋아요 취소" : "좋아요"}
        onClick={handleClick}
        disabled={loading}
        aria-pressed={isLiked}
      >
        {isLiked ? (
          <FaHeart size={size} className="text-red-500" />
        ) : (
          <FaRegHeart size={size} className="text-gray-400" />
        )}
      </button>
      {typeof count === "number" ? (
        <span className="text-sm text-gray-600">{count}</span>
      ) : null}
      {!scheduleId || !resolvedApiBase ? (
        <span style={{ fontSize: 12, color: "#888" }}>
          scheduleId와 API Base를 입력해줘.
        </span>
      ) : null}
      {error ? <span className="sr-only">에러: {error}</span> : null}
    </div>
  );
}
