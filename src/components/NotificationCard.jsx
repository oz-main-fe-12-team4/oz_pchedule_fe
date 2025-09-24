import { LuDot } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";

const NotificationCard = ({ notification }) => {
  return (
    <div className="text-sm flex justify-between gap-10">
      <div className="flex ">
        <span className={notification.is_read ? "opacity-0" : "text-[#ff0000]"}>
          <LuDot />
        </span>

        {notification.content}
      </div>
      <button>
        <FaTimes />
      </button>
    </div>
  );
};

export default NotificationCard;
