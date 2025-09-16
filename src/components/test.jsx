import React, { useState, useEffect } from "react";
import axios from "axios";
import ScheduleStoryCard from "./ScheduleStoryCard"; // 경로 네가 맞게 수정

function Test() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const ACCESS_TOKEN = "your_access_token_here"; // 실제 토큰 넣어줘야 함

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const res = await axios.get("/post/list", {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: {
            // sorting, filtering 등 필요하면 여기에 넣자
          },
        });

        // 응답에서 일정 배열 추출
        const data = res.data.data || [];
        setSchedules(data);
      } catch (err) {
        console.error("API 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSchedules();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (schedules.length === 0) return <div>일정이 없어요!</div>;

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {schedules.map((item) => (
        <ScheduleStoryCard key={item.post_id} schedule={item} />
      ))}
    </div>
  );
}

export default Test;
