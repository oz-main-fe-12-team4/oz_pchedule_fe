import DisplayWeek from "./DisplayWeek";

const DisplayWeeks = ({ weeks, onDayClick }) => {
  return weeks.map((week, i) => (
    <div key={i} className="grid grid-cols-7">
      <DisplayWeek week={week} onDayClick={onDayClick} />
    </div>
  ));
};

export default DisplayWeeks;
