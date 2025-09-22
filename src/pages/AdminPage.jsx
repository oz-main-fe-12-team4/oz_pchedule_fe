import React, { useState } from "react";
import UserCard from "../components/UserCard.jsx";
import { userList } from "../assets/data/dummyUser.js";

function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isReportedOnly, setIsReportedOnly] = useState(false);

  // 검색어와 필터링 상태에 따라 유저 목록을 동적으로 필터링
  const filteredUsers = userList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = isReportedOnly ? user.is_reported : true;
    return matchesSearch && matchesFilter;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterToggle = () => {
    setIsReportedOnly(!isReportedOnly);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>
      <div className="mb-6">
        <p>유저 목록을 확인하고 관리할 수 있습니다.</p>

        {/* 검색 입력창 */}
        <input
          type="text"
          placeholder="이름 또는 이메일로 검색"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-lg mt-2"
        />

        {/* 신고 유저 필터링 버튼 */}
        <button
          onClick={handleFilterToggle}
          className={`mt-2 py-2 px-4 rounded-lg font-bold ${
            isReportedOnly
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {isReportedOnly ? "전체 유저 보기" : "신고 유저만 보기"}
        </button>
      </div>

      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.user_id} user={user} />
          ))
        ) : (
          <div className="text-gray-500 text-center">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
