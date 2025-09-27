import { useState, useEffect } from "react";
import Input from "../common/Input";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import Button from "../common/Button";
import { FaPlusCircle, FaTrash } from "react-icons/fa";

const formatDate = (date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const SubScheduleModal = ({
  subSchedules,
  setSubSchedules,
  savedContent,
  startDate,
  endDate,
  startTime,
  endTime,
  mainScheduleSaved,
  handleSaveMainSchedule,
}) => {
  const [subContent, setSubContent] = useState("");
  const [subSelectedDate, setSubSelectedDate] = useState(startDate);
  const [subStartTime, setSubStartTime] = useState(startTime);
  const [subEndTime, setSubEndTime] = useState(endTime);

  useEffect(() => {
    setSubSelectedDate(startDate);
  }, [startDate]);

  const handleAddSubSchedule = () => {
    const newSub = {
      mainContent: savedContent || "메인 일정",
      content: subContent,
      startDate: subSelectedDate,
      endDate: subSelectedDate,
      startTime: subStartTime,
      endTime: subEndTime,
    };
    setSubSchedules([...subSchedules, newSub]);
    setSubContent("");
    setSubSelectedDate(startDate);
    setSubStartTime(startTime);
    setSubEndTime(endTime);
  };

  const handleDeleteSub = (idx) => {
    setSubSchedules(subSchedules.filter((_, i) => i !== idx));
  };

  const subDateOptions = [];
  for (
    let d = new Date(startDate);
    d.toDateString() <= endDate.toDateString();
    d.setDate(d.getDate() + 1)
  ) {
    subDateOptions.push(new Date(d));
  }

  return (
    <div className="mt-6 border-t pt-4">
      <div className="font-bold text-gray-700 text-lg mb-2">{savedContent}</div>

      <Input
        value={subContent}
        setValue={setSubContent}
        placeholder="세부 일정 내용"
        className="w-full text-[18px] font-bold text-gray-700 placeholder-gray-300 border-none outline-none focus:ring-0 mb-2"
      />

      <div className="flex items-center gap-2 mb-2">
        {/* 날짜 피커 */}
        <div className="flex-1 mr-4">
          <DatePicker
            value={subSelectedDate}
            onChange={setSubSelectedDate}
            options={subDateOptions}
            className="w-full"
          />
        </div>

        {/* 시작 시간 */}
        <div className="flex-1">
          <TimePicker
            value={subStartTime}
            onChange={setSubStartTime}
            min={startTime}
            max={endTime}
            className="w-full"
          />
        </div>
        <span className="text-gray-400">~</span>
        {/* 종료 시간 */}
        <div className="flex-1">
          <TimePicker
            value={subEndTime}
            onChange={setSubEndTime}
            min={startTime}
            max={endTime}
            className="w-full"
          />
        </div>
      </div>

      <Button
        onClick={handleAddSubSchedule}
        className="my-5 flex items-center gap-1"
      >
        <FaPlusCircle /> 일정추가
      </Button>

      {subSchedules.map((sch, idx) => (
        <div
          key={idx}
          className="border rounded-xl p-3 mb-2 shadow-sm bg-gray-50"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-gray-700">{sch.mainContent}</div>
              <div className="text-gray-500 text-sm">{sch.content}</div>
              <div className="text-gray-400 text-xs mt-1">
                {formatDate(sch.startDate)} | {sch.startTime}~{sch.endTime}
              </div>
            </div>
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={() => handleDeleteSub(idx)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {subSchedules.length > 0 && !mainScheduleSaved && (
        <Button
          variant="confirm"
          onClick={handleSaveMainSchedule}
          className="w-full mt-7 bg-[#2F7884] hover:bg-[#5AA5B2] text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors duration-200"
        >
          세부 일정 저장
        </Button>
      )}
    </div>
  );
};

export default SubScheduleModal;
