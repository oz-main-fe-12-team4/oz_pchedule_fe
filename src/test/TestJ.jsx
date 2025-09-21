import React, { useState, useEffect } from "react";
import LoadingPage from "../pages/LoadingPage"; // 상대경로 주의!!!

function TestJ() {
  return (
    // DetailSchedulePage 컴포넌트에 데이터 props로 전달!
    <DetailSchedulePage scheduleList={myScheduleData} />
  );
}

export default TestJ;
