import React from "react";
import Button from "./Button";
import ErrorImage from "../assets/errorLogo.png"; // 네 이미지 경로에 맞춰서!

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      {/* 이미지 */}
      <img
        src={ErrorImage}
        alt="에러 이미지"
        className="w-72 h-auto mb-6 select-none"
        draggable={false}
      />

      {/* 에러 문구 */}
      <h2 className="text-2xl font-bold mb-2 text-gray-800 select-text">
        페이지를 찾을 수 없어요
      </h2>
      <p className="mb-6 text-gray-600 max-w-md select-text">
        요청하신 페이지가 존재하지 않거나, 삭제되었을 수 있어요. <br />
        주소를 다시 한 번 확인해주세요.
      </p>

      {/* 확인 버튼 - 기능 없음 */}
      <Button variant="login" type="button">
        이전 화면으로
      </Button>
    </div>
  );
}

export default ErrorPage;
