import { BsCalendarPlus } from "react-icons/bs";

const PlusButton = ({
  onClick,
  size = 22,
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
      className={`inline-flex items-center justify-center rounded-full p-2
                  shadow-md hover:shadow-lg transition
                  bg-white hover:bg-gray-50
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${className}`}
    >
      <BsCalendarPlus size={size} />
    </button>
  );
};

export default PlusButton;
