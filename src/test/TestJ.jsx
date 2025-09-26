// src/test/TestJ.jsx
import React from "react";
import Input from "../components/common/Input";
import LikeButton from "../components/common/LikeButton";
import { useState } from "react";

export default function TestJ() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <Input value={inputValue} setValue={setInputValue} />
      <LikeButton />
    </div>
  );
}
