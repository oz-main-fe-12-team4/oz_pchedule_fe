import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between p-4">
        {/* 뒤로가기 버튼 */}
        <Link to="/" className="text-gray-600 hover:text-gray-800">
          <FaArrowLeft className="w-6 h-6" />
        </Link>
        {/* 페이지 제목 */}
        <h1 className="text-xl font-bold">마이페이지</h1>
        {/* 빈 공간 (정렬용) */}
        <div className="w-6 h-6"></div>
      </div>
    </header>
  );
}

export default Header;
