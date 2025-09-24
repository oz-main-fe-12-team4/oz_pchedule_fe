export const posts = {
  schedule_count: 4,
  data: [
    {
      id: 1,
      title: "일본 여행",
      start_period: "2025-10-26",
      category: {
        id: 1,
        name: "여행",
      },
      share_type: "전체공개",
      priority: "낮음",
      detail_schedule: [
        {
          id: 1,
          title: "우동 먹으러 가기",
          is_completed: false,
        },
        {
          id: 2,
          title: "공원 산책하기",
          is_completed: false,
        },
      ],
      recurrence: {
        type: "weekly",
        weekdays: ["월", "수"],
        day_of_month: "",
        month_of_year: "",
      },
      is_reported: false,
      like_count: 3,
      bookmark_count: 4,
    },
    {
      id: 2,
      title: "일본 여행",
      start_period: "2025-10-26",
      category: {
        id: 1,
        name: "여행",
      },
      share_type: "나만보기",
      priority: "보류",
      detail_schedule: [
        {
          id: 1,
          title: "우동 먹으러 가기",
          is_completed: false,
        },
        {
          id: 2,
          title: "공원 산책하기",
          is_completed: false,
        },
      ],
      recurrence: {
        type: "daily",
        weekdays: [],
        day_of_month: "",
        month_of_year: "",
      },
      is_reported: false,
      like_count: 3,
      bookmark_count: 0,
    },
    {
      id: 3,
      title: "일본 여행",
      start_period: "2025-10-26",
      category: {
        id: 1,
        name: "여행",
      },
      share_type: "전체공개",
      priority: "중간",
      detail_schedule: [
        {
          id: 1,
          title: "우동 먹으러 가기",
          is_completed: false,
        },
        {
          id: 2,
          title: "공원 산책하기",
          is_completed: false,
        },
      ],
      recurrence: {
        type: "monthly",
        weekdays: [],
        day_of_month: "25",
        month_of_year: "",
      },
      is_reported: false,
      like_count: 3,
      bookmark_count: 4,
    },
    {
      id: 4,
      title: "일본 여행",
      start_period: "2025-10-26",
      category: {
        id: 1,
        name: "여행",
      },
      share_type: "나만보기",
      priority: "높음",
      detail_schedule: [
        {
          id: 1,
          title: "우동 먹으러 가기",
          is_completed: false,
        },
        {
          id: 2,
          title: "공원 산책하기",
          is_completed: false,
        },
      ],
      recurrence: {
        type: "yearly",
        weekdays: [],
        day_of_month: "17",
        month_of_year: "9",
      },
      is_reported: true,
      like_count: 3,
      bookmark_count: 1,
    },
  ],
};
