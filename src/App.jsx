import React from "react";
import Test from "./components/test.jsx";
import BookmarkButton from "./components/BookmarkButton.jsx";

function App() {
  const itemId = 1; // 찜할 아이템의 고유 ID
  const initialBookmarkedStatus = false; // 초기 찜 상태 (처음에는 찜되지 않은 상태)

  return (
    <>
      <div>pchedule</div>

      <Test />

      {/* 여기에 BookmarkButton 컴포넌트를 추가합니다.
          필요한 props를 전달해줍니다.
      */}
      <div style={{ padding: "20px" }}>
        <h2>찜하기 버튼</h2>
        <p>버튼을 클릭해서 찜하기 기능을 테스트해보세요.</p>
        <BookmarkButton
          itemId={itemId}
          initialBookmarked={initialBookmarkedStatus}
        />
      </div>
    </>
  );
}

export default App;
