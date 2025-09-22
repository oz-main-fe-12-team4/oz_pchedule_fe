import React, { useState } from "react";
import { FaUserCircle, FaLock, FaTrash } from "react-icons/fa";

export default function UserCard({ user }) {
  const [isLocked, setIsLocked] = useState(false);
  const { userName, userEmail, isReported, reportReason } = user;

  const handleLockAccount = () => {
    setIsLocked((prev) => !prev);
    console.log("계정 잠금 버튼이 클릭되었습니다.");
  };

  const handleDeleteAccount = () => {
    console.log("계정 삭제 버튼이 클릭되었습니다.");
  };

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
      <FaUserCircle
        className={`w-12 h-12 ${isReported ? "text-red-500" : "text-gray-500"}`}
      />
      <div className="flex-1">
        <h2
          className={`text-lg font-semibold ${
            isReported ? "text-red-500" : "text-gray-800"
          }`}
        >
          {userName}
        </h2>
        <p className="text-gray-500 text-sm">{userEmail}</p>
      </div>

      {isReported && (
        <p className="text-red-500 font-bold px-2 py-1">
          신고 사유: {reportReason}
        </p>
      )}

      <div className="flex space-x-2">
        <button onClick={handleLockAccount} title="계정 잠금">
          <FaLock
            className={`w-6 h-6 transition-colors duration-200 ${
              isLocked ? "text-yellow-500" : "text-gray-500"
            }`}
          />
        </button>
        <button onClick={handleDeleteAccount} title="계정 삭제">
          <FaTrash className="w-6 h-6 text-gray-500 transition-colors duration-200 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}
