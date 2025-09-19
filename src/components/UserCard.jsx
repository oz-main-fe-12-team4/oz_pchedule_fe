import React from "react";
import { FaUserCircle, FaLock, FaTrash } from "react-icons/fa";

export default function UserCard({ user }) {
  const { userName, userEmail, isReported, reportReason } = user;

  const handleLockAccount = () => {
    console.log("계정 잠금 버튼이 클릭되었습니다.");
  };

  const handleDeleteAccount = () => {
    console.log("계정 삭제 버튼이 클릭되었습니다.");
  };

  return (
    <div className="relative flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
      <FaUserCircle
        style={
          isReported
            ? { color: "red", width: 48, height: 48 }
            : { color: "gray", width: 48, height: 48 }
        }
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
            style={{
              color: "gray",
              cursor: "pointer",
              transition: "color 0.3s ease",
              width: 24,
              height: 24,
            }}
          />
        </button>
        <button onClick={handleDeleteAccount} title="계정 삭제">
          <FaTrash
            style={{
              color: "gray",
              cursor: "pointer",
              transition: "color 0.3s ease",
              width: 24,
              height: 24,
            }}
          />
        </button>
      </div>
    </div>
  );
}
