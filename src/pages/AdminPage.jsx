import React, { useState } from "react";
import UserCard from "../components/UserCard.jsx";
import Input from "../components/Input.jsx";
import { userList } from "../assets/data/dummyUser.js";
import Button from "../components/Button.jsx";

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
    <div className="w-[calc(100vw-200px)] p-5">
      <div className="flex flex-col gap-2 pb-5 border-b">
        <h1 className="text-2xl font-bold mb-4">유저 목록</h1>
        <p className="text-gray-300">
          전체 {}명 신고된 유저 {}명
        </p>
      </div>
      <div className="flex flex-col gap-3 pb-3 border-b">
        {/* Input 컴포넌트 사용 */}
        <Input
          placeholder="이름 또는 이메일로 검색"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* FilterButton 컴포넌트 사용 */}
        <Button onClick={handleFilterToggle}>
          {isReportedOnly ? "전체 유저" : "신고 유저"}
        </Button>
      </div>

      <div className="">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="text-gray-500 text-center">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
