import React from "react";
import LikeButton from "../components/common/LikeButton";
import { useState } from "react";

export default function TestJ() {
  const [inputValue] = useState("");
  return (
    <div>
      <LikeButton
        scheduleId={inputValue}
        onMessage={(m) => {
          console.log("[TestJ] message:", m);
          alert(m);
        }}
      />
    </div>
  );
}
