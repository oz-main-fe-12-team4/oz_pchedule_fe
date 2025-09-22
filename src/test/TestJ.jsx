import React, { useState, useEffect } from "react";
import LoadingPage from "../pages/LoadingPage"; // 상대경로 주의!!!

function TestJ() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3초 뒤 로딩 해제
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="p-6 text-center text-gray-700">
      <h1 className="text-2xl font-bold mb-4">
        로딩 완료! 이게 실제 화면이야~
      </h1>
      <p>여기에 네 앱 주 컨텐츠가 들어가면 된다!</p>
    </div>
  );
}

export default TestJ;
