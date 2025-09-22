// src/test/TestL.jsx

import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard.jsx";

function TestL() {
  // 1. API 데이터를 저장할 상태를 만듭니다.
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect 훅을 사용하여 컴포넌트가 처음 로드될 때 API를 호출합니다.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT_HERE"); // 3. 여기에 실제 API 주소를 넣어주세요.
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.data); // 4. API 응답에서 사용자 데이터 배열을 가져와 상태에 저장합니다.
        console.log(data); // 데이터가 제대로 들어오는지 확인
      } catch (e) {
        // 5. 오류가 발생하면 에러 상태를 업데이트합니다.
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // 빈 배열을 넣어 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">테스트 페이지</h1>
      <p className="mb-6 text-gray-600">
        아래에서 유저 카드 컴포넌트의 UI를 확인하세요.
      </p>

      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user, index) => <UserCard key={index} user={user} />)
        ) : (
          <div>사용자 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default TestL;
