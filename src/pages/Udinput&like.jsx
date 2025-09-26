import React, { useState, useEffect } from "react";
import Input from "../components/common/Input";
import LikeButton from "../components/common/LikeButton";
import { useDebounce } from "../hooks/useDebounce";

export default function UdinputLike() {
  // 검색어 상태와 디바운스 상태
  const [inputValue, setInputValue] = useState("");
  const debouncedInput = useDebounce(inputValue, 500);

  // 좋아요 상태와 디바운스 상태
  const [isLiked, setIsLiked] = useState(false);
  const debouncedLike = useDebounce(isLiked, 300);

  // 디바운스된 검색어 값이 바뀔 때 처리할 작업(예: API 호출)
  useEffect(() => {
    if (debouncedInput !== "") {
      console.log("디바운스된 검색어 값:", debouncedInput);
      // 여기서 검색 API 호출 등 작업 추가 가능해
    }
  }, [debouncedInput]);

  // 디바운스된 좋아요 상태가 바뀔 때 처리할 작업
  useEffect(() => {
    console.log("디바운스된 좋아요 상태:", debouncedLike);
    // 좋아요 상태 반영 후 처리할 작업 가능
  }, [debouncedLike]);

  return (
    <div>
      <div>
        <Input
          placeholder="검색어를 입력하세요"
          value={inputValue}
          setValue={setInputValue}
        />
      </div>

      <div>
        <LikeButton
          size={30}
          isLiked={isLiked}
          onClick={() => {
            setIsLiked((prev) => !prev);
            console.log("좋아요 버튼 클릭, isLiked 값 변경! 현재값:", !isLiked);
          }}
        />
      </div>
    </div>
  );
}
