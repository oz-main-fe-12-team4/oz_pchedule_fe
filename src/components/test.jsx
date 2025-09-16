import ScheduleStoryCard from "./ScheduleStoryCard";

function Test() {
  const dummySchedule = {
    id: 1,
    title: "오로지 내 취향으로만 가득한 여행일정!",
    likes: 22,
    bookmarks: 207,
    isBookmarked: false,
    isReported: false,
  };

  return (
    <div>
      <ScheduleStoryCard schedule={dummySchedule} isAdmin={false} />
    </div>
  );
}

export default Test;
