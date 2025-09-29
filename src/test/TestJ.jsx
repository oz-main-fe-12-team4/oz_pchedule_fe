import { useState } from "react";
import LikeButton from "../components/common/LikeButton";

export default function TestJ() {
  const [scheduleId, setScheduleId] = useState("");
  const [token, setToken] = useState("");

  console.log("[TestJ] render", { scheduleId, token });

  return (
    <div style={{ padding: 16, display: "grid", gap: 12, maxWidth: 520 }}>
      <h2>LikeButton 테스트</h2>

      <label>
        Access Token
        <input
          value={token}
          onChange={(e) => {
            console.log("setToken", e.target.value);
            setToken(e.target.value);
          }}
          placeholder="Bearer 토큰 값"
          style={{ width: "100%" }}
        />
      </label>

      <label>
        scheduleId
        <input
          value={scheduleId}
          onChange={(e) => {
            console.log("setScheduleId", e.target.value);
            setScheduleId(e.target.value);
          }}
          placeholder="예: 123"
          style={{ width: "100%" }}
        />
      </label>

      <LikeButton
        scheduleId={scheduleId || "123"} // 임시 기본값으로 클릭 반응 확인
        token={token || undefined}
        onMessage={(m) => {
          console.log("[TestJ] message:", m);
        }}
      />

      <button onClick={() => console.log("[TestJ] plain button clicked")}>
        테스트용 버튼
      </button>
    </div>
  );
}
