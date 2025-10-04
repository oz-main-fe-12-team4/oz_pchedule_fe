import DisplayWeek from "./DisplayWeek";

const DisplayWeeks = ({ weeks, onDayClick }) => {
  return weeks.map((week, i) => (
    <div key={i} className="h-[102px]">
      <DisplayWeek week={week} onDayClick={onDayClick} />
    </div>
  ));
};

export default DisplayWeeks;
