import SubScheduleModal from "./SubScheduleModal";
import MainScheduleModal from "./MainScheduleModal";
import { toDate } from "../../utils/dateFormat";
import useAddScheduleHandlers from "../../hooks/useAddScheduleHandler";
import Button from "../common/Button";

const AddScheduleModal = (props) => {
  const {
    onClose,
    periodStart,
    periodEnd,
    sameEndToStart = false,
    showSub = true,
  } = props;

  const {
    contentRef,
    mainSchedule,
    subSchedules,
    calendarModal,
    openFilter,
    openCalendarHandler,
    closeCalendarHandler,
    handleDateSelect,
    handleFilterChange,
    handleFilterToggle,
    handleSaveMainSchedule,
    handleSubmitSchedule,
    toTimeString,
    setStartTime,
    setEndTime,
    setSubSchedules,
    setMainSchedule, // store 값 수정을 위해
  } = useAddScheduleHandlers(props);

  return (
    <div className="fixed inset-0 bg-black/20 z-50">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
          <div className="overflow-y-auto overscroll-contain p-6">
            <MainScheduleModal
              titleValue={mainSchedule.title}
              setTitleValue={(value) => setMainSchedule("title", value)}
              contentValue={mainSchedule.description}
              setContentValue={(value) => setMainSchedule("description", value)}
              startDate={mainSchedule.startDate}
              endDate={mainSchedule.endDate}
              startTime={mainSchedule.startTime}
              endTime={mainSchedule.endTime}
              filters={mainSchedule.filters}
              mainScheduleSaved={mainSchedule.mainScheduleSaved}
              contentRef={contentRef}
              openFilter={openFilter}
              handleFilterChange={handleFilterChange}
              handleFilterToggle={handleFilterToggle}
              calendarModal={calendarModal}
              openCalendar={openCalendarHandler}
              closeCalendar={closeCalendarHandler}
              handleSaveMainSchedule={handleSaveMainSchedule}
              handleDateSelect={handleDateSelect}
              toTimeString={toTimeString}
              onClose={onClose}
              showSub={showSub}
              minDate={periodStart ? toDate(periodStart) : undefined}
              maxDate={periodEnd ? toDate(periodEnd) : undefined}
              sameEndToStart={sameEndToStart}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
            />
            {/* showSub가 false 일때 세부일정모달없이 저장하기 버튼 보이기, true일때는 세부일정모달 + 추가기능 */}
            {showSub && mainSchedule.mainScheduleSaved ? (
              <SubScheduleModal
                subSchedules={subSchedules}
                setSubSchedules={setSubSchedules}
                savedContent={mainSchedule.savedContent}
                startDate={mainSchedule.startDate}
                endDate={mainSchedule.endDate}
                startTime={mainSchedule.startTime}
                endTime={mainSchedule.endTime}
                filters={mainSchedule.filters}
                openFilter={openFilter}
                handleFilterToggle={handleFilterToggle}
                handleFilterChange={handleFilterChange}
                toTimeString={toTimeString}
                onClose={onClose}
                mainScheduleSaved={mainSchedule.mainScheduleSaved}
                handleSubmitSchedule={handleSubmitSchedule}
              />
            ) : (
              <Button
                variant="confirm"
                onClick={async () => {
                  await handleSubmitSchedule(onClose);
                }}
                className="w-full mt-7 bg-[#2F7884] hover:bg-[#5AA5B2] text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors duration-200"
              >
                저장하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScheduleModal;
