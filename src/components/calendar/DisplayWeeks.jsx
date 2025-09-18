import DisplayWeek from "./DisplayWeek";

const DisplayWeeks = ({ weeks }) => {
  return weeks.map((week, i) => (
    <div key={i} className="grid grid-cols-7">
      <DisplayWeek week={week} />
    </div>
  ));
};

export default DisplayWeeks;
