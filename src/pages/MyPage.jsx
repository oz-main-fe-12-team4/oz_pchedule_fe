import React, { useState } from "react";
import axios from "axios";
import { FaUserCircle, FaHeart, FaBookmark, FaPencilAlt } from "react-icons/fa";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";
// ConfirmModal import 추가
import ConfirmModal from "../components/common/ConfirmModal.jsx";
import { user1 } from "../assets/data/dummyUser.js";

const accessToken = "your_access_token_here";

function MyPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(
    user1.data.allow_notification
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        current_password: currentPassword,
        new_password: passwords.newPassword,
        new_password_confirm: passwords.confirmPassword,
      };

      const response = await axios.patch(
        "/user/me/edit/password",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setCurrentPassword("");
        setPasswords({
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      if (error.response) {
        alert(`비밀번호 변경 실패: ${error.response.data.error}`);
      } else {
        console.error("API 호출 중 오류 발생:", error);
        alert(
          "비밀번호 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        );
      }
    }
  };

  const handleNotificationToggle = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
  };

  // 모달을 여는 함수 (회원 탈퇴 버튼 클릭 시 호출)
  const openWithdrawalModal = () => {
    setIsModalOpen(true);
  };

  // 모달을 닫는 함수 (취소 버튼 클릭 시 호출)
  const closeWithdrawalModal = () => {
    setIsModalOpen(false);
  };

  // 실제 회원 탈퇴 API를 호출하는 함수 (모달에서 '확인' 클릭 시 호출)
  const handleWithdrawalConfirm = async () => {
    closeWithdrawalModal(); // 모달 닫기

    try {
      const response = await axios.delete("/user/me/withdraw", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        alert("회원 탈퇴가 완료되었습니다.");
      }
    } catch (error) {
      if (error.response) {
        alert(`회원 탈퇴 실패: ${error.response.data.error}`);
      } else {
        console.error("API 호출 중 오류 발생:", error);
        alert("회원 탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div className="p-5 max-w-2xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <aside className="w-full md:w-1/3 p-6 bg-white rounded-xl shadow-md border border-gray-200">
          <section className="flex flex-col items-center text-center">
            <FaUserCircle className="w-24 h-24 text-gray-400 mb-4" />
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-xl font-semibold">{user1.data.name}</p>
              <button className="text-gray-500">
                <FaPencilAlt className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">{user1.data.email}</p>
            <div className="flex space-x-6 text-gray-600">
              <div className="flex items-center space-x-1">
                <FaHeart className="w-5 h-5 text-red-500" />
                <span>{user1.data.total_like}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaBookmark className="w-5 h-5 text-yellow-500" />
                <span>{user1.data.total_bookmark}</span>
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
                  placeholder="새 비밀번호"
                  type="password"
                  errorMessage="비밀번호가 일치하지 않습니다."
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
                  onClick={openWithdrawalModal} // 모달 열기 함수 호출
                  type="button" // 폼 제출을 막기 위해 type="button"으로 변경
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

      {/* 회원 탈퇴 ConfirmModal 추가 */}
      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          title="회원 탈퇴 확인"
          message="정말로 회원 탈퇴를 하시겠습니까? 모든 정보가 영구적으로 삭제됩니다."
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
