// src/test/TestL.jsx

import React from "react";
import MyPage from "../pages/MyPage.jsx"; // MyPage 컴포넌트 임포트

function TestL() {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">테스트 페이지</h1>
      <p className="mb-6 text-gray-600">
        아래에서 유저 카드 컴포넌트의 UI를 확인하세요.
      </p>

      <div className="space-y-4">
        {userList.length > 0 ? (
          userList.map((user) => <UserCard key={user.user_id} user={user} />)
        ) : (
          <div>사용자 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default TestL;
