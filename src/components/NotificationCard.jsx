import { notificationList } from "../assets/data/dummyNotificationList";

const NotificationCard = () => {
  const sortedNotificationList = notificationList.data.sort(
    (a, b) => b.id - a.id
  );
  return (
    <>
      {sortedNotificationList.map((el) => (
        <div>{el.content}</div>
      ))}
    </>
  );
};

export default NotificationCard;
