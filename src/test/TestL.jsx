import React from "react";
import UserCard from "../components/UserCard";
import { userList } from "../assets/data/dummyUser";

function TestL() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>테스트 페이지</h1>
      <p>아래에서 유저 카드 컴포넌트의 UI를 확인하세요.</p>

      <div style={{ marginTop: "20px" }}>
        {userList.map((user, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestL;
