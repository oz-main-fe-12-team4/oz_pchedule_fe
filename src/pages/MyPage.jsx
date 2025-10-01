import React, { useState, useEffect } from "react";
import { FaUserCircle, FaHeart, FaBookmark, FaPencilAlt } from "react-icons/fa";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";
import ConfirmModal from "../components/common/ConfirmModal.jsx";
import {
  changePassword,
  fetchWithdrawUser,
  fetchGetUserData,
} from "../services/userApi.js";
import Header from "../components/layout/Header.jsx";
import { useNavigate } from "react-router";

function MyPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchGetUserData();
      if (data) {
        setUserData(data);
        setIsNotificationEnabled(data.allow_notification);
      }
      setIsLoading(false);
    };
    loadUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-20 text-center text-xl">
        사용자 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-20 text-center text-red-600 text-xl">
        사용자 정보를 불러올 수 없습니다.
      </div>
    );
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const success = await changePassword(
      currentPassword,
      passwords.newPassword,
      passwords.confirmPassword
    );

    if (success) {
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setCurrentPassword("");
      setPasswords({
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleNotificationToggle = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
    // TODO: 서버에 알림 설정 변경 API 호출 로직 추가
  };

  const openWithdrawalModal = () => {
    setIsModalOpen(true);
  };

  const closeWithdrawalModal = () => {
    setIsModalOpen(false);
  };

  const handleWithdrawalConfirm = async () => {
    closeWithdrawalModal();

    const success = await fetchWithdrawUser();

    if (success) {
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/login");
    }
  };

  return (
    <div className="p-5 max-w-2xl mx-auto font-sans pt-20">
      <Header />
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <aside className="w-full md:w-1/3 p-6 bg-white rounded-xl shadow-md border border-gray-200">
          <section className="flex flex-col items-center text-center">
            <FaUserCircle className="w-24 h-24 text-gray-400 mb-4" />
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-xl font-semibold">{userData.name}</p>
              <button className="text-gray-500">
                <FaPencilAlt className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">{userData.email}</p>
            <div className="flex space-x-6 text-gray-600">
              <div className="flex items-center space-x-1">
                <FaHeart className="w-5 h-5 text-red-500" />
                <span>{userData.total_like}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaBookmark className="w-5 h-5 text-yellow-500" />
                <span>{userData.total_bookmark}</span>
              </div>
            </div>
          </section>

          <hr className="my-6 border-gray-200" />

          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">알림 설정</h2>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={isNotificationEnabled}
                  onChange={handleNotificationToggle}
                  className="peer opacity-0 w-0 h-0"
                />
                <span
                  className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-colors duration-300
                  before:content-[''] before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-transform before:duration-300
                  peer-checked:bg-blue-500 peer-checked:before:translate-x-6"
                />
              </label>
            </div>
          </section>

          <hr className="my-6 border-gray-200" />
        </aside>

        <main className="w-full md:w-2/3 p-6 bg-white rounded-xl shadow-md border border-gray-200">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">비밀번호 변경</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-4">
                <Input
                  label="현재 비밀번호"
                  inputId="currentPassword"
                  value={currentPassword}
                  setValue={setCurrentPassword}
                  placeholder="현재 비밀번호"
                  type="password"
                />
                <Input
                  label="새 비밀번호"
                  inputId="newPassword"
                  value={passwords.newPassword}
                  setValue={(value) =>
                    setPasswords((prev) => ({ ...prev, newPassword: value }))
                  }
                  placeholder="새 비밀번호 (8~20자)"
                  type="password"
                  errorMessage="8~20자 사이의 영문, 숫자, 특수문자 조합이어야 합니다."
                />
                <Input
                  label="새 비밀번호 확인"
                  inputId="confirmPassword"
                  value={passwords.confirmPassword}
                  setValue={(value) =>
                    setPasswords((prev) => ({
                      ...prev,
                      confirmPassword: value,
                    }))
                  }
                  placeholder="새 비밀번호 확인"
                  type="password"
                  errorMessage="비밀번호가 일치하지 않습니다."
                  compareValue={passwords.newPassword}
                />
              </div>

              <div className="flex justify-end items-center space-x-4 pt-4">
                <button
                  onClick={openWithdrawalModal}
                  type="button"
                  className="text-red-500 hover:text-red-700 font-semibold text-sm"
                >
                  회원 탈퇴
                </button>
                <Button
                  type="submit"
                  children={"수정 완료"}
                  className="py-2 px-6 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
                />
              </div>
            </form>
          </section>
        </main>
      </div>
      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          title="회원 탈퇴 확인"
          message="정말로 회원 탈퇴를 하시겠습니까? 모든 정보가 영구적으로 삭제되며, 되돌릴 수 없습니다."
          onConfirm={handleWithdrawalConfirm}
          onClose={closeWithdrawalModal}
          leftBtnText="취소"
          rightBtnText="탈퇴"
        />
      )}
    </div>
  );
}

export default MyPage;
