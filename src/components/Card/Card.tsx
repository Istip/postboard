import Image from "next/image";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  CalendarIcon,
  CheckCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Post } from "@/interfaces/Post";
import { toast } from "react-hot-toast";
import Comments from "../Comments/Comments";
import { usePathname } from "next/navigation";

type CardProps = {
  post?: Post;
};

const Card: React.FC<CardProps> = ({ post }) => {
  const convertTimestamp = (timestamp: any) => {
    return timestamp?.toDate().toISOString().split("T")[0];
  };

  const pathname = usePathname();

  const deleteString =
    pathname.slice(1, pathname.length) === "notes"
      ? "has been removed from notes!"
      : "has been removed from the shopping list!";

  const postId = post?.id || "";
  const cardOpacity = post?.done ? "opacity-50" : "";
  const cardBorder = !post?.marked
    ? "border-slate-700 border-opacity-0"
    : "border-yellow-500";

  const handleDelete = async () => {
    try {
      // Delete the post
      await deleteDoc(doc(db, "posts", postId));

      // Query for comments with the same postId
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, where("id", "==", postId));
      const querySnapshot = await getDocs(q);

      // Delete the comments
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      toast.error(() => (
        <div>
          <span className="font-bold text-md items-center">{`${post?.text}`}</span>{" "}
          <span className="opacity-75">{deleteString}</span>
        </div>
      ));
    } catch (error) {
      toast.error("Something went wrong! Please try again!");
    }
  };

  const handleStatus = () => {
    setDoc(doc(db, "posts", postId), {
      ...post,
      done: !post?.done,
      marked: false,
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
      className={`mb-3 text-slate-200 rounded-md border ${cardOpacity} ${cardBorder}`}
    >
      <div className="w-full p-2 bg-slate-900 flex gap-2 justify-between items-center rounded-t-md hover:bg-opacity-70 transition-all border-b-slate-950 border-b cursor-grab">
        <div className="rounded-full bg-slate-950">
          <Image
            src={post?.photoUrl || "/avatar.bmp"}
            className="w-6 h-6 border rounded-full bg-slate-950 border-slate-500"
            width={24}
            height={24}
            alt={post?.displayName || ""}
          />
        </div>

        <div className="text-slate-600 font-bold text-sm flex gap-2 items-center">
          <div>{post?.displayName}</div>
          <button className="text-yellow-500" onClick={handleMark}>
            {!post?.marked ? <BookmarkIcon /> : <BookmarkFilledIcon />}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 p-4 text-sm">
        <div className="text-lg font-light">{post?.text}</div>

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
