import { BsCalendarPlus } from "react-icons/bs";

const PlusButton = ({
  onClick,
  size = 32,
  title = "일정 추가",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`group fixed right-4 bottom-4 z-50
                  inline-flex items-center justify-center
                  w-12 h-12 text-[#223F43]
                  ${className}`}
    >
      <BsCalendarPlus
        size={size}
        className="transition-transform duration-150 group-hover:scale-110"
      />
    </button>
  );
};

export default PlusButton;
