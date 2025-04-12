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
import { useAuthContext } from "@/context/AuthContext";

const Notification: React.FC<{ notification: NotificationType }> = ({
  notification,
}) => {
  const { user } = useAuthContext();
  const isCreator = user?.email === notification.email;

  const handleStatus = () => {
    if (notification.id) {
      setDoc(doc(db, "notifications", notification.id), {
        ...notification,
        seen: true,
      });
    }
  };

  const handleRemove = async () => {
    try {
      if (notification.id) {
        await deleteDoc(doc(db, "notifications", notification.id));
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again!");
    }
  };

  return (
    <div
      className={`mb-2 text-zinc-300 w-full bg-zinc-900 p-2 text-xs rounded-l-md flex border-r-4 ${borderColor(
        notification
      )} ${notification.seen ? "opacity-50" : ""}`}
    >
      <div className="flex w-full">
        <Image
          className="mr-2 mt-1 w-6 h-6 border rounded-full bg-zinc-950 border-white"
          src={notification?.photoUrl || "/avatar.jpg"}
          width={24}
          height={24}
          alt={notification?.displayName || ""}
        />
        <div className="w-full mr-2">
          <div>
            <NotificationMessage notification={notification} />
          </div>
          <div className="text-zinc-500 flex items-center gap-1 pt-1.5">
            <CalendarIcon /> {convertTimestamp(notification?.createdAt)}
          </div>

          {!isCreator && (
            <div className="w-full flex gap-1 justify-between bg-zinc-800 mt-2 py-1 px-2 rounded-md">
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
          )}
        </div>

        <NotificationIcon notification={notification} />
      </div>
    </div>
  );
};
export default Notification;
