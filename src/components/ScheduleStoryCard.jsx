import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router";
import { RiAlarmWarningFill } from "react-icons/ri";
import DeleteButton from "./common/DeleteButton";
import { useState } from "react";
import ConfirmModal from "./common/ConfirmModal";
import useUserStore from "../stores/userStore";

function ScheduleStoryCard({ schedule }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { isAdmin } = useUserStore();
  const navigate = useNavigate();

  const handleClickDeleteButton = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <div
      className="bg-white p-3 rounded-md cursor-pointer hover:scale-110 hover:shadow
    flex flex-col items-center justify-center gap-1 text-center"
      onClick={() => navigate(`/schedule_story/${schedule.id}`)}
    >
      {/* 회색 박스 */}
      <div className="bg-gray-300 rounded-md h-32 w-[200px] relative">
        {!isAdmin && (
          <div className="absolute bottom-2 right-2">
            {schedule.bookmark_count > 0 ? ( // 조건식 바꾸기. user 데이터에 있는 my_bookmarks에 일정의 아이디가 있는지 확인
              <FaBookmark size={25} className="text-amber-500" />
            ) : (
              <FaRegBookmark size={25} className="text-gray-400" />
            )}
          </div>
        )}
        {isAdmin && (
          <div>
            <div className="text-[#ff0000] absolute top-2 left-2">
              {schedule.is_reported ? <RiAlarmWarningFill size={20} /> : ""}
            </div>
            <div className="absolute bottom-2 right-2">
              <DeleteButton
                size={25}
                className={"bg-white rounded-full"}
                onClick={handleClickDeleteButton}
              />
            </div>
          </div>
        )}
        {isConfirmModalOpen && (
          <ConfirmModal
            message={"삭제 하시겠습니까?"}
            leftBtnText={"예"}
            rightBtnText={"아니요"}
            onLeftClick={() => {}}
            onRightClick={() => setIsConfirmModalOpen(false)}
            onClose={() => setIsConfirmModalOpen(false)}
          />
        )}
      </div>

      {/* 제목 */}
      <h2 className="text-lg font-semibold truncate" title={schedule.title}>
        {schedule.title}
      </h2>

      {/* 좋아요 & 찜하기 */}
      <div className="flex gap-3 text-gray-600 text-sm font-medium justify-center">
        <div> 좋아요: {schedule.like_count ?? 0}</div>
        <div> 찜하기: {schedule.bookmark_count ?? 0}</div>
      </div>
    </div>
  );
}
export default ScheduleStoryCard;
