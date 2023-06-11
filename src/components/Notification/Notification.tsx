import { NotificationType } from "@/interfaces/Notification";
import { CalendarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import NotificationIcon from "./NotificationIcon";
import { NotificationMessage } from "./NotificationMessage";
import { convertTimestamp } from "@/utils/formatDate";

const Notification: React.FC<{ notification: NotificationType }> = ({
  notification,
}) => {
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
          <div>
            <NotificationMessage notification={notification} />
          </div>
          <div className="text-slate-500 flex items-center gap-1 pt-1.5">
            <CalendarIcon /> {convertTimestamp(notification?.createdAt)}
          </div>

          <div className="w-full flex gap-1 justify-between bg-slate-800 mt-1 py-1 px-2 rounded-md">
            <div className="w-full text-center">Remove</div>
            <div className="w-full text-center">Mark as read</div>
          </div>
        </div>

        <NotificationIcon notification={notification} />
      </div>
    </div>
  );
};
export default Notification;
