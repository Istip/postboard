import { NotificationType } from "@/interfaces/Notification";
import { CalendarIcon, CheckIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { convertTimestamp } from "@/utils/formatDate";
import { borderColor } from "./notificationUtils";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import NotificationIcon from "./NotificationIcon";
import NotificationMessage from "./NotificationMessage";
import { toast } from "react-hot-toast";

const Notification: React.FC<{ notification: NotificationType }> = ({
  notification,
}) => {
  const handleStatus = () => {
    setDoc(doc(db, "notifications", notification.id), {
      ...notification,
      seen: true,
    });
  };

  const handleRemove = async () => {
    try {
      // Delete the post
      await deleteDoc(doc(db, "notifications", notification.id));

      toast.error("Notification removed!");
    } catch (error) {
      toast.error("Something went wrong! Please try again!");
    }
  };

  return (
    <div
      className={`mb-3 text-slate-300 w-full bg-slate-900 p-2 text-xs rounded-l-md flex border-r-2 ${borderColor(
        notification
      )}`}
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

          <div className="w-full flex gap-1 justify-between bg-slate-800 mt-2 py-1 px-2 rounded-md">
            <button className="w-full text-center" onClick={handleRemove}>
              Remove
            </button>
            <button
              className="w-full text-center disabled:opacity-50 flex items-center justify-center gap-1"
              onClick={handleStatus}
              disabled={notification.seen}
            >
              {notification.seen && <CheckIcon />}
              {notification.seen ? "Seen" : "Mark as seen"}
            </button>
          </div>
        </div>

        <NotificationIcon notification={notification} />
      </div>
    </div>
  );
};
export default Notification;
