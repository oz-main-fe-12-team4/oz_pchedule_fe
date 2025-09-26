const DisplayWeek = ({ week, onDayClick }) => {
  return week.map((el, i) => (
    <div
      key={i}
      className={`${
        el === week[0]
          ? "text-[#ec4e4e]"
          : el === week[6]
          ? "text-[#7892f0]"
          : "text-black"
      } 
            h-[102px] px-[8px] border-t border-[#393939] truncate`}
      onClick={() => onDayClick(el.date)}
    >
      <h2 className="h-[30px] text-[15px] flex p-[6px] cursor-pointer">
        {el.date}
      </h2>
    </div>
  ));
};

export default DisplayWeek;
