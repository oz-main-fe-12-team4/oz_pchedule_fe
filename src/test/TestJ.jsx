// src/test/TestJ.jsx
import { useState, useEffect } from "react";
import LikeButton from "../components/common/LikeButton";

export default function TestJ() {
  const [scheduleId, setScheduleId] = useState("");
  const [apiBase, setApiBase] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedBase = window.localStorage.getItem("API_BASE");
    const savedToken = window.localStorage.getItem("access_token");
    if (savedBase) setApiBase(savedBase);
    if (savedToken) setToken(savedToken);
  }, []);

  const handleSave = () => {
    if (typeof window === "undefined") return;
    if (apiBase) window.localStorage.setItem("API_BASE", apiBase);
    if (token) window.localStorage.setItem("access_token", token);
    alert("저장 완료");
  };

  return (
    <div style={{ padding: 16, display: "grid", gap: 12, maxWidth: 520 }}>
      <h2>LikeButton 연결 테스트</h2>

      <label>
        API Base(비워두면 .env의 VITE_API_BASE_URL 사용)
        <input
          value={apiBase}
          onChange={(e) => setApiBase(e.target.value)}
          placeholder={
            import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000"
          }
          style={{ width: "100%" }}
        />
      </label>

      <label>
        Access Token
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Bearer 토큰 값"
          style={{ width: "100%" }}
        />
      </label>

      <label>
        scheduleId
        <input
          value={scheduleId}
          onChange={(e) => setScheduleId(e.target.value)}
          placeholder="예: 123"
          style={{ width: "100%" }}
        />
      </label>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={handleSave}>로컬 저장</button>
        <LikeButton
          scheduleId={scheduleId}
          apiBase={apiBase || undefined}
          token={token || undefined}
          onMessage={(m) => {
            console.log("SERVER MESSAGE:", m);
            if (typeof window !== "undefined") alert(m);
          }}
        />
      </div>
    </div>
  );
}
