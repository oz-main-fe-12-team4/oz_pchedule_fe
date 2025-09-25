const myScheduleData = {
  data: {
    id: 1,
    title: "일본여행",
    start_period: "2025-10-9 00:00:09",
    end_period: "2025-10-12 00:04:20",
    schedule: [
      {
        id: 1,
        title: "우동 먹으러 가기",
        description: "신주쿠역 유명 A우동집",
        start_time: "2025-10-9  09:00:00",
        end_time: "2025-10-9  11:00:00",
      },
      {
        id: 2,
        title: "호텔 체크인",
        description: "신주쿠역 도보 5분 B호텔",
        start_time: "2025-10-9  13:00:00",
        end_time: "2025-10-9  14:00:00",
      },
      // 네 일정 더 추가 가능
      {
        id: 3,
        title: "낮잠자기 ",
        description: "호텔에서 23421342412341234123123412시간동안 낮잠",
        start_time: "2025-10-10 14:00:00",
        end_time: "2025-10-10 15:00:00",
      },
      {
        id: 4,
        title: "호텔 체크아웃임",
        description: "199999999999999999999999999999972년후 체크아웃",
        start_time: "2025-10-11 15:00:00",
        end_time: "2025-10-11 16:00:00",
      },
    ],
    is_shared: true,
    like_count: 22,
    bookmark_count: 22,
  },
};

export default myScheduleData;
