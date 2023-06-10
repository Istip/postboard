import { NotificationType } from "@/interfaces/Notification";
import {
  ChatBubbleIcon,
  FileIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

const Notification: React.FC<{ notification: NotificationType }> = ({
  notification,
}) => {
  const convertTimestamp = (timestamp: any) => {
    return timestamp?.toDate().toISOString().split("T")[0];
  };

  const handleText = (notification: NotificationType) => {
    const { type } = notification;

    if (type === "comment") {
      return (
        <>
          <span className="font-bold text-green-500">
            {notification.displayName}{" "}
          </span>
          commented on:{" "}
          <span className="font-bold text-white">{notification.post} </span>{" "}
          where it has been said:{" "}
          <span className="font-bold text-white">{notification.text}</span>.
        </>
      );
    }

    if (type === "shopping") {
      return (
        <>
          <span className="font-bold text-green-500">
            {notification.displayName}{" "}
          </span>{" "}
          added new item to the shopping list:{" "}
          <span className="font-bold text-white">{notification.text}</span>.
        </>
      );
    }

    if (type === "notes") {
      return (
        <>
          <span className="font-bold text-green-500">
            {notification.displayName}{" "}
          </span>{" "}
          left a new note:{" "}
          <span className="font-bold text-white">{notification.text}</span>.
        </>
      );
    }

    return "";
  };

  const border =
    notification.type === "notes"
      ? "border-yellow-500"
      : notification.type === "shopping"
      ? "border-green-500"
      : notification.type === "comment"
      ? "border-slate-500"
      : "";

  return (
    <div
      className={`mb-3 text-slate-300 w-full bg-slate-900 p-2 text-xs rounded-l-md flex border-r-2 ${border}`}
    >
      <div className="flex w-full">
        <Image
          className="mr-2 mt-1 w-6 h-6 border rounded-full bg-slate-950 border-white"
          src={notification?.photoUrl || "/avatar.bmp"}
          width={24}
          height={24}
          alt={notification?.displayName || ""}
        />
        <div className="w-full">
          <div>{handleText(notification)}</div>
          <div className="text-slate-500">
            {convertTimestamp(notification?.createdAt)}
          </div>
        </div>

        <div className="h-full flex items-center">
          {notification.type === "shopping" && (
            <div className="bg-green-500 m-1 p-1.5 flex items-center rounded-full text-black">
              <ListBulletIcon />
            </div>
          )}
          {notification.type === "notes" && (
            <div className="bg-yellow-500 m-1 p-1.5 flex items-center rounded-full text-black">
              <FileIcon />
            </div>
          )}
          {notification.type === "comment" && (
            <div className="bg-slate-500 m-1 p-1.5 flex items-center rounded-full">
              <ChatBubbleIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Notification;
