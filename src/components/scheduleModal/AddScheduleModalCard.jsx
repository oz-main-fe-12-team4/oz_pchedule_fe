import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import AddScheduleModal from "./AddScheduleModal";
import Button from "../common/Button";

const AddScheduleModalCard = () => {
  const [schedules, setSchedules] = useState([]);

  const handleSaveSchedule = (schedule) => {
    setSchedules((prev) => [...prev, schedule]);
  };

  const handleDeleteSchedule = (index) => {
    setSchedules((prev) => prev.filter((_, i) => i !== index));
  };

  const formatDate = (date) => `${date.getMonth() + 1}월 ${date.getDate()}일`;

  return (
    <div className="p-4">
      {/* 일정 추가 모달 */}
      <AddScheduleModal title="" content="" onSave={handleSaveSchedule} />

      {/* 일정 카드 리스트 */}
      <div className="mt-4 flex flex-col gap-3">
        {schedules.map((schedule, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-4 shadow flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-800">{schedule.title}</h3>
              <button
                onClick={() => handleDeleteSchedule(idx)}
                className="text-gray-400 hover:text-gray-700"
              >
                <FaTrash />
              </button>
            </div>
            {/* <div className="flex gap-2 text-xs text-gray-500 flex-wrap">
              {schedule.filters.category && (
                <span className="px-2 py-1 bg-gray-200 rounded">
                  {schedule.filters.category}
                </span>
              )}
              {schedule.filters.priority && (
                <span className="px-2 py-1 bg-gray-200 rounded">
                  {schedule.filters.priority}
                </span>
              )}
              {schedule.filters.share && (
                <span className="px-2 py-1 bg-gray-200 rounded">
                  {schedule.filters.share}
                </span>
              )}
              {schedule.filters.repeat && (
                <span className="px-2 py-1 bg-gray-200 rounded">
                  {schedule.filters.repeat}
                  {schedule.filters.repeatSub &&
                    (Array.isArray(schedule.filters.repeatSub)
                      ? ` (${schedule.filters.repeatSub
                          .map((set) => `${set.month}월 ${set.day}일`)
                          .join(", ")})`
                      : ` (${schedule.filters.repeatSub})`)}
                </span>
              )}
            </div> */}
            <div className="text-gray-600 text-sm">
              {formatDate(schedule.startDate)} {schedule.startTime} ~{" "}
              {formatDate(schedule.endDate)} {schedule.endTime}
            </div>
            <p className="text-gray-800">{schedule.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddScheduleModalCard;
