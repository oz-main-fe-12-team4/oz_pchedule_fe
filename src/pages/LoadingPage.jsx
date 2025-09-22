import React from "react";
import LoadingImage from "../assets/loadingLogo.png"; // 이미지 경로 확인 꼭!

function LoadingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* 크게 키운 이미지, 스피너 바로 위에 딱! */}
      <img
        src={LoadingImage}
        alt="로딩 이미지"
        className="absolute top-66 w-75 h-50 select-none"
        draggable={false}
      />

      {/* 파란 원형 스피너 */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin z-10 mt-24"></div>

      {/* 로딩 텍스트 */}
      <p className="mt-4 text-blue-600 font-semibold text-lg select-none z-10">
        로딩 중...
      </p>
    </div>
  );
}

export default LoadingPage;
