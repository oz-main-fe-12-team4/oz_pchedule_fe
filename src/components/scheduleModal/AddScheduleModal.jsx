import SubScheduleModal from "./SubScheduleModal";
import MainScheduleModal from "./MainScheduleModal";
import { toDate } from "../../utils/dateFormat";
import useAddScheduleHandlers from "../../hooks/useAddScheduleHandler";

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

            {showSub && mainSchedule.mainScheduleSaved && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScheduleModal;
