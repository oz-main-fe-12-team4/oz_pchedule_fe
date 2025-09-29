import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeSchedule, unlikeSchedule } from "../../sevices/likeApi";

export default function LikeButton({
  size = 20,
  scheduleId,
  token,
  onMessage,
}) {
  console.log("[LikeButton] render");
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    console.log("[LikeButton] clicked", { scheduleId, isLiked, loading });
    if (loading) return;
    if (!scheduleId || (typeof scheduleId === "string" && !scheduleId.trim())) {
      alert("scheduleId가 없습니다.");
      return;
    }
    setLoading(true);
    const prev = isLiked;
    setIsLiked(!prev);
    try {
      const accessToken =
        token ||
        (typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : "");
      const data = prev
        ? await unlikeSchedule(scheduleId, accessToken)
        : await likeSchedule(scheduleId, accessToken);
      if (data?.message)
        onMessage ? onMessage(data.message) : alert(data.message);
    } catch (e) {
      setIsLiked(prev); // 롤백
      console.error(e);
      alert(e?.message || "요청 실패");
    } finally {
      setLoading(false);
      console.log("[LikeButton] done");
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        padding: 12,
        cursor: loading ? "not-allowed" : "pointer",
        pointerEvents: "auto",
      }}
      aria-pressed={isLiked}
      title={isLiked ? "좋아요 취소" : "좋아요"}
    >
      {isLiked ? (
        <FaHeart size={size} color="#ef4444" />
      ) : (
        <FaRegHeart size={size} color="#9ca3af" />
      )}
    </button>
  );
}
