import { LuDot } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";
import {
  fetchDeleteNotification,
  fetchPostNotification,
} from "../services/notificationApi";

const NotificationCard = ({ notification }) => {
  const handleClickNotification = async () => {
    await fetchPostNotification(notification.id);
  };
  const handleClickDeleteButton = async () => {
    await fetchDeleteNotification(notification.id);
  };
  return (
    <div className="text-sm flex justify-between gap-10">
      <button onClick={handleClickNotification} className="flex ">
        <span className={notification.is_read ? "opacity-0" : "text-[#ff0000]"}>
          <LuDot />
        </span>

        {notification.content}
      </button>
      <button onClick={handleClickDeleteButton}>
        <FaTimes />
      </button>
    </div>
  );
};

export default NotificationCard;
