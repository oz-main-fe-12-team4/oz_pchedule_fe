import { useState } from "react";
import Input from "../components/common/Input";
import logo from "../assets/Logo.svg";
import googleLogo from "../assets/google.png";
import naverLogo from "../assets/naver.png";
import kakaoLogo from "../assets/kakao.png";
import { Link } from "react-router";
import Button from "../components/common/Button";
import { fetchLogin } from "../sevices/authApi";

const Login = () => {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchLogin(emailInputValue, passwordInputValue);
  };

  return (
    <div className="p-5 max-w-2xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
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
                <FaHeart className="w-5 h-5" />
                <span>0</span>
              </button>
              <button
                onClick={handleBookmarkClick}
                className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
              >
                <FaBookmark className="w-5 h-5" />
                <span>0</span>
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
                  compareValue={passwords.confirmPassword}
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
};

export default MyPage;
