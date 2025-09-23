import React from "react";
import { FaUserCircle, FaLock } from "react-icons/fa";
import DeleteButton from "./DeleteButton";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

export default function UserCard({ user }) {
  const { name, email, is_active, is_reported, report_reason } = user;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleLockAccount = () => {
    console.log("계정 잠금/해제 API 호출");
  };

  const handleDeleteAccount = () => {
    console.log("계정 삭제 API 호출");
  const handleClickDeleteButton = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
      <FaUserCircle
        className={`w-12 h-12 ${
          is_reported ? "text-red-500" : "text-gray-500"
        }`}
      />
      <div className="flex-1">
        <h2
          className={`text-lg font-semibold ${
            is_reported ? "text-red-500" : "text-gray-800"
          }`}
        >
          이름: {name}
        </h2>
        <p className="text-gray-500 text-sm">이메일: {email}</p>
      </div>

      {is_reported && (
        <p className="text-red-500 font-bold px-2 py-1">
          신고 사유: {report_reason}
        </p>
      )}

      <div className="flex space-x-2">
        <button onClick={handleLockAccount} title="계정 잠금/해제">
          <FaLock
            className={`w-6 h-6 transition-colors duration-200 ${
              is_active ? "text-gray-500" : "text-yellow-500"
            }`}
          />
        </button>
        <DeleteButton onClick={handleClickDeleteButton} />
      </div>
      {isConfirmModalOpen && (
        <ConfirmModal
          message={"삭제 하시겠습니까?"}
          leftBtnText={"예"}
          rightBtnText={"아니요"}
          onLeftClick={() => {}}
          onRightClick={() => setIsConfirmModalOpen(false)}
          onClose={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  );
}
