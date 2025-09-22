import React, { useState } from "react";
import {
  FaUserCircle,
  FaSearch,
  FaBell,
  FaHeart,
  FaBookmark,
  FaPencilAlt,
} from "react-icons/fa";
import Input from "../components/Input.jsx";
import logo from "../assets/loadingLogo.png";

const dummyUser = {
  name: "서단비",
  email: "test@naver.com",
};

const accessToken = "your_access_token_here";

function MyPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  // 좋아요, 북마크 상태 (토글 기능)
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
  };

  // 북마크 버튼 클릭 핸들러
  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  // 비밀번호 변경 로직
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("/user/me/edit/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: passwords.newPassword,
          new_password_confirm: passwords.confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setCurrentPassword("");
        setPasswords({
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        alert(`비밀번호 변경 실패: ${result.error}`);
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      alert(
        "비밀번호 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
  };

  // 알림 설정 토글 로직
  const handleNotificationToggle = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
  };

  // 회원 탈퇴 로직
  const handleWithdrawal = async () => {
    const isConfirmed = window.confirm(
      "정말로 회원 탈퇴를 하시겠습니까? 모든 정보가 영구적으로 삭제됩니다."
    );

    if (isConfirmed) {
      try {
        const response = await fetch("/user/me/withdraw", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          alert("회원 탈퇴가 완료되었습니다.");
        } else {
          alert(`회원 탈퇴 실패: ${result.error}`);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        alert("회원 탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div className="p-5 max-w-2xl mx-auto font-sans">
      {/* 상단 메뉴바 */}
      <nav className="flex items-center justify-between py-4 mb-6">
        <img src={logo} alt="로고" className="h-12" />
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">
            <FaSearch className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <FaBell className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <FaUserCircle className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* 왼쪽 사이드 패널 */}
        <aside className="w-full md:w-1/3 p-6 bg-white rounded-xl shadow-md border border-gray-200">
          <section className="flex flex-col items-center text-center">
            <FaUserCircle className="w-24 h-24 text-gray-400 mb-4" />
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-xl font-semibold">{dummyUser.name}</p>
              <button className="text-gray-500 hover:text-gray-700">
                <FaPencilAlt className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">{dummyUser.email}</p>
            <div className="flex space-x-6 text-gray-600">
              <button
                onClick={handleLikeClick}
                className="flex items-center space-x-1 hover:text-red-500 transition-colors"
              >
                <FaHeart
                  className={isLiked ? "w-5 h-5 text-red-500" : "w-5 h-5"}
                />
                <span>{isLiked ? 1 : 0}</span>
              </button>
              <button
                onClick={handleBookmarkClick}
                className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
              >
                <FaBookmark
                  className={isBookmarked ? "w-5 h-5 text-blue-500" : "w-5 h-5"}
                />
                <span>{isBookmarked ? 1 : 0}</span>
              </button>
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
        </aside>

        {/* 오른쪽 메인 콘텐츠 영역 */}
        <main className="w-full md:w-2/3 p-6 bg-white rounded-xl shadow-md border border-gray-200">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">비밀번호 변경</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-4">
                <Input
                  label="현재 비밀번호"
                  inputId="currentPassword"
                  setValue={setCurrentPassword}
                  placeholder="현재 비밀번호"
                  type="password"
                  errorMessage="유효하지 않은 비밀번호입니다."
                />
                <Input
                  label="새 비밀번호"
                  inputId="newPassword"
                  setValue={(value) =>
                    setPasswords((prev) => ({ ...prev, newPassword: value }))
                  }
                  placeholder="새 비밀번호"
                  type="password"
                  errorMessage="비밀번호가 일치하지 않습니다."
                  compareValue={passwords.confirmPassword}
                />
                <Input
                  label="새 비밀번호 확인"
                  inputId="confirmPassword"
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
                  onClick={handleWithdrawal}
                  className="text-red-500 hover:text-red-700 font-semibold text-sm"
                >
                  회원 탈퇴
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
                >
                  수정 완료
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default MyPage;
