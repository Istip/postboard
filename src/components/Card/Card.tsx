import Image from "next/image";
import { User } from "firebase/auth";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  CalendarIcon,
  CheckCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Post } from "@/interfaces/Post";
import { toast } from "react-hot-toast";
import Comments from "../Comments/Comments";

type CardProps = {
  user: User | null;
  post?: Post;
};

const Card: React.FC<CardProps> = ({ user, post }) => {
  const convertTimestamp = (timestamp: any) => {
    return timestamp?.toDate().toISOString().split("T")[0];
  };

  const postId = post?.id || "";
  const cardOpacity = post?.done ? "opacity-50" : "";
  const cardBorder = post?.marked
    ? "border-slate-700 border-opacity-50"
    : "border-yellow-500";

  const handleDelete = () => {
    deleteDoc(doc(db, "posts", postId))
      .then(() => {
        toast.success(() => (
          <div>
            <span className="font-bold text-md items-center">{`${post?.text}`}</span>{" "}
            <span className="opacity-75">removed from shopping list!</span>
          </div>
        ));
      })
      .catch(() => {
        toast.error("Something went wrong! Please try again!");
      });
  };

  const handleStatus = () => {
    setDoc(doc(db, "posts", postId), {
      ...post,
      done: !post?.done,
    });
  };

  const handleMark = () => {
    setDoc(doc(db, "posts", postId), {
      ...post,
      marked: !post?.marked,
    });
  };

  return (
    <div
      className={`mb-4 text-slate-200 rounded-md border ${cardOpacity} ${cardBorder}`}
    >
      <div className="w-full p-2 bg-slate-900 flex gap-2 justify-between items-center rounded-t-md hover:bg-opacity-70 transition-all border-b-slate-950 border-b cursor-grab">
        <div className="rounded-full bg-slate-950 border border-yellow-500">
          <Image
            src={user?.photoURL || "/avatar.bmp"}
            className="w-6 h-6 border rounded-full bg-slate-950 border-white"
            width={24}
            height={24}
            alt={user?.displayName || ""}
          />
        </div>

        <div className="text-slate-600 font-bold text-sm flex gap-2 items-center">
          <div>{user?.displayName}</div>
          <button className="text-yellow-500" onClick={handleMark}>
            {post?.marked ? <BookmarkIcon /> : <BookmarkFilledIcon />}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 p-4 text-sm">
        <div className="uppercase text-lg font-medium">{post?.text}</div>

        <Comments post={post} />
      </div>

      <div className="w-full p-2 bg-slate-900 flex gap-2 justify-between items-center rounded-b-md border-t-slate-950 border-t">
        <div className="w-full flex items-center justify-between">
          <div className="text-xs flex gap-2 text-slate-500">
            <CalendarIcon /> <p>{convertTimestamp(post?.createdAt)}</p>
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-red-500 rounded-md"
              onClick={handleDelete}
            >
              <TrashIcon />
            </button>
            <button
              className="px-4 py-2 bg-green-600 rounded-md"
              onClick={handleStatus}
            >
              <CheckCircledIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
