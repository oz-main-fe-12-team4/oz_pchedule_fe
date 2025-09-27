import TimeCard from "../components/common/TimeCard";
import DetailScheduleCard from "../components/DetailScheduleCard";
import LikeButton from "../components/common/LikeButton";
import BookmarkButton from "../components/common/BookmarkButton";
import myScheduleData from "../assets/data/dummyDetailSchedule";
import { RiAlarmWarningFill } from "react-icons/ri";
import { IoChevronBackSharp } from "react-icons/io5";
import formatDateAndDay from "../utils/formatDateAndDay";
import groupSchedulesByDate from "../utils/groupSchedulesByDate";
import getDayCounts from "../utils/getDayCounts";
import { useNavigate } from "react-router";
import AddScheduleModal from "../components/scheduleModal/AddScheduleModal";
import { useState } from "react";
import { toDate, toTimeString } from "../utils/dateFormat";

function ScheduleStoryDetailPage() {
  const navigate = useNavigate();
  const { data } = myScheduleData;

  // 상세일정 수정 반영용
  const [schedules, setSchedules] = useState(data.schedule);

  // 날짜별 일정 묶기 & 정렬
  const groupedSchedules = groupSchedulesByDate(schedules ?? []);
  const sortedDates = Object.keys(groupedSchedules ?? {});
  // 시작일부터 종료일까지 Day N 배열
  const dayCounts = getDayCounts(data.start_period, data.end_period);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState(null);

  const handleOpenEditModal = (editedValues, schedule, editDetailDate) => {
    setScheduleToEdit({
      id: schedule.id,
      title: editedValues.title ?? schedule.title,
      description: editedValues.description ?? schedule.description,
      defaultStartDate: toDate(editDetailDate),
      defaultEndDate: toDate(editDetailDate),
      defaultStartTime: toTimeString(schedule.start_time),
      defaultEndTime: toTimeString(schedule.end_time),
    });
    setIsEditModalOpen(true);
  };
  const handleEditSubmitMain = (payload) => {
    setSchedules((prev) =>
      prev.map((sch) => (sch.id === payload.id ? { ...sch, ...payload } : sch))
    );
    setIsEditModalOpen(false);
    setScheduleToEdit(null);
  };

  return (
    <div className="w-[calc(100vw-200px)] flex flex-col gap-10 p-5 text-gray-900">
      {/* 상단 헤더 */}
      <header className="w-[100%] flex items-center justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="뒤로 가기"
            className="text-2xl font-bold cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
            onClick={() => navigate(-1)}
          >
            <IoChevronBackSharp size={30} />
          </button>

          <h1 className="text-left font-semibold text-2xl truncate">
            {data.title}
          </h1>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <LikeButton />
            <span className="text-xs text-gray-600 mt-1">
              {data.like_count}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <BookmarkButton />
            <span className="text-xs text-gray-600 mt-1">
              {data.bookmark_count}
            </span>
          </div>

          <button
            type="button"
            title="신고하기"
            aria-label="신고하기"
            className="cursor-pointer text-gray-700 hover:text-red-600 transition-colors p-1"
            onClick={() => {}}
          >
            <RiAlarmWarningFill size={25} />
          </button>
        </div>
      </header>

      {/* 날짜별 일정 묶어서 렌더링 */}
      {sortedDates.map((editDetailDate, index) => {
        const schedulesForDate = groupedSchedules[editDetailDate] ?? [];
        const dayText = dayCounts[index] || `Day ${index + 1}`;
        const formattedDate = formatDateAndDay(editDetailDate);

        return (
          <section key={editDetailDate} className="mb-8">
            {/* Day N ;; 월.일 요일 */}
            <div className="mb-4 flex items-center space-x-2 text-lg font-semibold">
              <span>{dayText}</span>
              <span className="text-gray-600">{formattedDate}</span>
            </div>

            <div className="relative flex flex-col">
              {/* 왼쪽 점선 */}
              <div
                className="absolute top-5 left-12 h-[calc(100%-2rem)] border-l-4 border-dashed border-gray-400"
                style={{ zIndex: 0 }}
              />

              {/* 일정 카드 리스트 */}
              {schedulesForDate.map(
                ({ id, start_time, end_time, title, description }) => (
                  <div
                    key={id}
                    className="flex items-center mb-6 last:mb-0 relative z-10"
                  >
                    <TimeCard
                      time={`${toTimeString(start_time)}~${toTimeString(
                        end_time
                      )}`}
                    />
                    <DetailScheduleCard
                      title={title}
                      description={description}
                      onEdit={(editedValues) =>
                        handleOpenEditModal(
                          editedValues,
                          {
                            id,
                            start_time,
                            end_time,
                            title,
                            description,
                          },
                          editDetailDate
                        )
                      }
                    />
                  </div>
                )
              )}
            </div>
          </section>
        );
      })}

      {isEditModalOpen && scheduleToEdit && (
        <AddScheduleModal
          id={scheduleToEdit.id}
          title={scheduleToEdit.title}
          content={scheduleToEdit.description}
          defaultStartDate={scheduleToEdit.defaultStartDate}
          defaultEndDate={scheduleToEdit.defaultEndDate}
          defaultStartTime={scheduleToEdit.defaultStartTime}
          defaultEndTime={scheduleToEdit.defaultEndTime}
          onSubmit={handleEditSubmitMain}
          onClose={() => {
            setIsEditModalOpen(false);
            setScheduleToEdit(null);
          }}
          showSub={false}
        />
      )}
    </div>
  );
}

export default ScheduleStoryDetailPage;
