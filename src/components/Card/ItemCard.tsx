import { useState } from "react";
import Image from "next/image";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  CheckCircledIcon,
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
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { Post } from "@/interfaces/Post";
import Comments from "../Comments/Comments";
import DoubleCheckRemove from "./DoubleCheckRemove";

type CardProps = {
  post?: Post;
  acceptable?: boolean;
  comments?: boolean;
};

const ItemCard: React.FC<CardProps> = ({
  post,
  acceptable = true,
  comments = true,
}) => {
  const [confirm, setConfirm] = useState(false);
  const [value, setValue] = useState(post?.text as string);

  const pathname = usePathname();

  const deleteString =
    pathname.slice(1, pathname.length) === "notes"
      ? "has been removed from notes!"
      : "has been removed from the shopping list!";

  const postId = post?.id || "";
  const cardOpacity = post?.done ? "opacity-50" : "";
  const background = post?.marked ? "bg-amber-500" : "bg-zinc-900";
  const successButton = !post?.marked ? "bg-green-600" : "bg-green-700";
  const dangerButton = !post?.marked ? "bg-red-500" : "bg-red-600";

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

  const handleDoubleCheck = () => setConfirm(true);
  const handleCancellation = () => setConfirm(false);

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

  const handleSaveOnBlur = () => {
    setDoc(doc(db, "posts", postId), {
      ...post,
      text: value,
    });
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  return (
    <div className={`text-zinc-200 rounded-xl overflow-hidden ${cardOpacity}`}>
      <div className={`${background} pb-2 pt-2 px-2 text-sm rounded-t-xl`}>
        <div className="text-lg font-light flex items-start justify-between">
          <div className="w-full">
            <input
              className={`${
                post?.marked
                  ? "text-zinc-950 focus:bg-zinc-700/20 focus:pl-3"
                  : "text-zinc-50 focus:bg-zinc-700/40 focus:pl-3"
              } w-full text-[12px] bg-transparent outline-none transition-all py-1 rounded-lg`}
              onChange={handleChange}
              placeholder="Please type here..."
              value={value}
              onBlur={handleSaveOnBlur}
            />
          </div>

          <div className="text-zinc-600 font-bold text-sm pl-1 flex gap-2 items-center h-8">
            <button className="text-amber-500" onClick={handleMark}>
              <div className="sr-only">
                {!post?.marked ? "Bookmark this post" : "Remove from bookmarks"}
              </div>
              <div
                className={`${
                  !post?.marked ? "text-amber-500" : "text-amber-700"
                }`}
              >
                {!post?.marked ? <BookmarkIcon /> : <BookmarkFilledIcon />}
              </div>
            </button>
          </div>
        </div>

        {comments && <Comments post={post} />}
      </div>

      <div
        className={`${background} w-full p-2 flex gap-2 justify-between items-center rounded-b-xl border-t-zinc-950 border-t`}
      >
        <div className="w-full flex items-center justify-between gap-2">
          <Image
            src={post?.photoUrl || "/avatar.jpg"}
            className="w-7 h-7 border rounded-lg bg-zinc-950 border-zinc-800"
            width={24}
            height={24}
            alt={post?.displayName || ""}
            title={post?.displayName || ""}
          />

          <div className="flex w-full gap-2">
            <DoubleCheckRemove
              confirm={confirm}
              dangerButton={dangerButton}
              handleDelete={handleDelete}
              handleCancellation={handleCancellation}
              handleDoubleCheck={handleDoubleCheck}
              doubleCheck={false}
            />

            {acceptable && (
              <button
                className={`${successButton} flex items-center justify-center px-2 py-2 rounded-lg w-full`}
                onClick={handleStatus}
              >
                <div className="sr-only">Mark as complete</div>
                <CheckCircledIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemCard;
