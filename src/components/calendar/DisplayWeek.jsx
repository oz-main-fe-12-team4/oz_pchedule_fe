import DisplaySchedules from "./DisplaySchedules";

const DisplayWeek = ({ week, onDayClick }) => {
  return (
    <div>
      <div className="grid grid-cols-7">
        {week.map((el, i) => (
          <div
            key={i}
            className={`flex flex-col items-center border-t border-[#393939] truncate`}
            onClick={() => onDayClick(el.date)}
          >
            <h2
              className={`${
                el === week[0]
                  ? "text-[#ec4e4e]"
                  : el === week[6]
                  ? "text-[#7892f0]"
                  : "text-black"
              } h-[30px] text-[15px] p-[6px] cursor-pointer`}
            >
              {el.date}
            </h2>
          </div>
        ))}
      </div>
      <DisplaySchedules week={week} />
    </div>
  );
};

export default DisplayWeek;
