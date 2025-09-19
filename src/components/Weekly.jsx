const Weekly = ({ firstDateOfThisWeek }) => {
  const thisWeek = [];

  for (let i = 0; i < 7; i++) {
    thisWeek.push(firstDateOfThisWeek + i);
  }

  return (
    <div className="h-[80%] grid grid-cols-7 text-center">
      {thisWeek.map((el, i) => (
        <div
          key={i}
          className={`${
            el === thisWeek[0]
              ? "text-[#ec4e4e]"
              : el === thisWeek[6]
              ? "text-[#7892f0]"
              : "text-black"
          } border-t border-[#000000] ${
            el === thisWeek[6] ? "border-r-0" : "border-r"
          } h-[100%] p-[15px_0]`}
        >
          {el}
        </div>
      ))}
    </div>
  );
};
export default Weekly;
