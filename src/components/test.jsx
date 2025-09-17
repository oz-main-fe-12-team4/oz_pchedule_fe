import Login from "../pages/Login";

import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";

function Test() {
  const [showModal, setShowModal] = useState(true);

  const handleLeftClick = () => {
    console.log("왼쪽 버튼 클릭");
    setShowModal(false);
  };

  const handleRightClick = () => {
    console.log("오른쪽 버튼 클릭");
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <ConfirmModal
          message="겹치는 일정이 있습니다. 지금 일정으로 변경하시겠습니까?"
          leftBtnText="변경"
          rightBtnText="유지"
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
        />
      )}
      <h1>테스트 페이지입니다.</h1>
    </div>
  );
}
export default Test;
