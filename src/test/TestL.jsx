import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard.jsx";

function TestL() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT_HERE");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.data);
        console.log(data);
      } catch (e) {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
