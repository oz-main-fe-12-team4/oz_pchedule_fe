// src/components/UserCard.jsx
import { useState } from "react";

export default function UserCard() {
  const profileImage = "https://via.placeholder.com/150";
  const userName = "능지호";
  const userEmail = "jihojiho@gmail.com";

  const [isReported, setIsReported] = useState(true);
  const reportReason = "나에게 모욕감을 줌 ";

  const [showReportReason, setShowReportReason] = useState(false);

  const toggleReportReason = () => {
    setShowReportReason((prev) => !prev);
  };

  // 계정 잠금 및 삭제 버튼 클릭 핸들러
  const handleLockAccount = () => {
    console.log("계정 잠금 버튼이 클릭되었습니다.");
    // 나중에 여기에 계정 잠금 API 호출 로직이 들어갑니다.
  };

  const handleDeleteAccount = () => {
    console.log("계정 삭제 버튼이 클릭되었습니다.");
    // 나중에 여기에 계정 삭제 API 호출 로직이 들어갑니다.
  };

  return (
    <div className="relative flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
      <img
        className="w-12 h-12 rounded-full"
        src={profileImage}
        alt={`${userName}의 프로필 사진`}
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{userName}</h2>
        <p className="text-gray-500 text-sm">{userEmail}</p>
      </div>

      <div className="flex space-x-2">
        {isReported && (
          <button
            className="text-red-500 font-bold px-2 py-1 rounded hover:bg-red-100 transition-colors"
            onClick={toggleReportReason}
          >
            신고
          </button>
        )}

        {/* 계정 잠금 버튼 추가 */}
        <button
          className="text-gray-700 font-bold px-2 py-1 rounded hover:bg-gray-200 transition-colors"
          onClick={handleLockAccount}
        >
          계정 잠금
        </button>

        {/* 계정 삭제 버튼 추가 */}
        <button
          className="text-gray-700 font-bold px-2 py-1 rounded hover:bg-gray-200 transition-colors"
          onClick={handleDeleteAccount}
        >
          삭제
        </button>
      </div>

      {isReported && showReportReason && (
        <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 p-2 bg-gray-100 border rounded shadow-lg text-sm text-gray-800">
          사유: {reportReason}
        </p>
      )}
    </div>
  );
}
