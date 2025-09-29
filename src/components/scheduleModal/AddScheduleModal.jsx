// src/components/schedule/AddScheduleModal.jsx
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
    toTimeString,
    setStartTime,
    setEndTime,
  } = useAddScheduleHandlers(props);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-md">
        <MainScheduleModal
          {...mainSchedule}
          contentRef={contentRef}
          openFilter={openFilter}
          handleFilterChange={handleFilterChange}
          handleFilterToggle={handleFilterToggle}
          calendarModal={calendarModal}
          openCalendar={openCalendarHandler}
          closeCalendar={closeCalendarHandler}
          handleSaveMainSchedule={() => handleSaveMainSchedule(onClose)}
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
          />
        )}
      </div>
    </div>
  );
};

export default AddScheduleModal;
