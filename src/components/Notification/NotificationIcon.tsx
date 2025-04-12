import { NotificationType } from "@/interfaces/Notification";
import {
  ChatBubbleIcon,
  FileIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";

const NotificationIcon: React.FC<{ notification: NotificationType }> = ({
  notification,
}) => {
  return (
    <div className="h-full flex items-center">
      {notification.type === "shopping" && (
        <div className="bg-green-500 m-1 p-1.5 flex items-center rounded-full text-black">
          <ListBulletIcon />
        </div>
      )}
      {notification.type === "notes" && (
        <div className="bg-amber-500 m-1 p-1.5 flex items-center rounded-full text-black">
          <FileIcon />
        </div>
      )}
      {notification.type === "comment" && (
        <div className="bg-zinc-500 m-1 p-1.5 flex items-center rounded-full">
          <ChatBubbleIcon />
        </div>
      )}
    </div>
  );
};
export default NotificationIcon;
