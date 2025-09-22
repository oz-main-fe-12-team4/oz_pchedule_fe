// src/test/TestJ.jsx

import React from "react";
import DetailSchedulePage from "../pages/DetailSchedulePage";

// 데이터는 형식 바꿔서 이렇게 JSON 구조로 넣었어
const myScheduleData = {
  data: {
    id: 1,
    title: "일본여행",
    schedule: [
      {
        id: 1,
        title: "우동 먹으러 가기",
        description: "신주쿠역 유명 A우동집…",
        start_time: "09:00:00",
        end_time: "10:00:00",
      },
      {
        id: 2,
        title: "호텔 체크인",
        description: "신주쿠역 도보 5분 B호텔…",
        start_time: "13:00:00",
        end_time: "14:00:00",
      },
      // 네 일정 더 추가 가능
      {
        id: 3,
        title: "낮잠자기 ",
        description: "호텔에서 23421342412341234123123412시간동안 낮잠",
        start_time: "14:00:00",
        end_time: "15:00:00",
      },
      {
        id: 4,
        title: "호텔 체크아웃임",
        description: "199999999999999999999999999999972년후 체크아웃",
        start_time: "15:00:00",
        end_time: "16:00:00",
      },
    ],
    is_shared: true,
    like_count: 3,
    bookmark_count: 4,
  },
};

function TestJ() {
  // HH:mm:ss → HH:mm 변환 함수
  const formatTime = (timeStr) => timeStr.slice(0, 5);

  // JSON data.schedule 배열 맵 돌면서 시간 합쳐서 넘기기
  const scheduleList = myScheduleData.data.schedule.map(
    ({ id, title, description, start_time, end_time }) => ({
      id,
      title,
      description,
      time: `${formatTime(start_time)}~${formatTime(end_time)}`,
    })
  );

  return <DetailSchedulePage scheduleList={scheduleList} />;
}

export default TestJ;
