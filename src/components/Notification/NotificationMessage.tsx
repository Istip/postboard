import { NotificationType } from "@/interfaces/Notification";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const NotificationMessage: React.FC<{
  notification: NotificationType;
}> = ({ notification }) => {
  const { type } = notification;

  if (type === "comment") {
    return (
      <>
        <span className="font-bold text-yellow-500">
          {notification.displayName}{" "}
        </span>
        commented on:{" "}
        <span className="font-bold text-white">{notification.post} </span>{" "}
        <ArrowRightIcon className="inline-flex" />{" "}
        <span className="font-bold text-white">{notification.text}</span>.
      </>
    );
  }

  if (type === "shopping") {
    return (
      <>
        <span className="font-bold text-yellow-500">
          {notification.displayName}{" "}
        </span>{" "}
        added a new item to the shopping list:{" "}
        <span className="font-bold text-white">{notification.text}</span>.
      </>
    );
  }

  if (type === "notes") {
    return (
      <>
        <span className="font-bold text-yellow-500">
          {notification.displayName}{" "}
        </span>{" "}
        left a new note:{" "}
        <span className="font-bold text-white">{notification.text}</span>.
      </>
    );
  }

  return null;
};

export default NotificationMessage;
