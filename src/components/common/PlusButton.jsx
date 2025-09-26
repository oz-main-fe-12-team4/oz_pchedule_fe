import { BsCalendarPlus } from "react-icons/bs";

const PlusButton = ({ onClick, title = "일정 추가", disabled = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`group fixed right-4 bottom-4 z-50
                  inline-flex items-center justify-center
                  w-16 h-16 text-[#223F43]`}
    >
      <BsCalendarPlus
        size={36}
        className="transition-transform duration-150 group-hover:scale-110 cursor-pointer"
      />
    </button>
  );
};

export default PlusButton;
