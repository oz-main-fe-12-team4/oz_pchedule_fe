const DisplayDays = () => {
  const days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];

  return (
    <div className="h-[40px] grid grid-cols-7 text-center">
      {days.map((el) => (
        <div
          className={`${
            el === days[0]
              ? "text-[#ec4e4e]"
              : el === days[6]
              ? "text-[#7892f0]"
              : "text-black"
          }
                        h-[30px]`}
          key={el}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default DisplayDays;
