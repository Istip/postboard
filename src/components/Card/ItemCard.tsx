import { useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
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
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { Post } from "@/interfaces/Post";
import Comments from "../Comments/Comments";

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
  const cardBorder = !post?.marked
    ? "border-stone-700 border-opacity-0"
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
    <div
      className={`ext-stone-200 rounded-md border overflow-hidden ${cardOpacity} ${cardBorder}`}
    >
      <div className="bg-stone-900 p-4 text-sm rounded-t-xl">
        <div className="text-lg font-light flex items-start justify-between">
          <div className="w-full">
            <input
              className="w-full text-stone-50 text-[12px]  bg-transparent outline-none focus:bg-stone-700/20 py-1 rounded-lg"
              onChange={handleChange}
              placeholder="What did you like or dislike?"
              value={value}
              onBlur={handleSaveOnBlur}
            />
          </div>

          <div className="text-stone-600 font-bold text-sm pl-1 flex gap-2 items-center h-8">
            <button className="text-yellow-500" onClick={handleMark}>
              {!post?.marked ? <BookmarkIcon /> : <BookmarkFilledIcon />}
            </button>
          </div>
        </div>

        {comments && <Comments post={post} />}
      </div>

      <div className="w-full p-2 bg-stone-900 flex gap-2 justify-between items-center rounded-b-xl border-t-stone-950 border-t">
        <div className="w-full flex items-center justify-between">
          <div className="text-xs flex gap-2 text-stone-500 items-center justify-center">
            <div className="rounded-full bg-stone-950">
              <Image
                src={post?.photoUrl || "/avatar.bmp"}
                className="w-8 h-8 border rounded-lg bg-stone-950 border-stone-500"
                width={24}
                height={24}
                alt={post?.displayName || ""}
              />
            </div>
          </div>

          <div className="flex gap-2">
            {confirm ? (
              <div>
                <div className="flex">
                  <button
                    className="px-2 py-2 bg-red-500 rounded-l-lg"
                    onClick={handleDelete}
                  >
                    <TrashIcon />
                  </button>
                  <button
                    className="px-2 py-2 bg-stone-700 rounded-r-lg"
                    onClick={handleCancellation}
                  >
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  className="px-2 py-2 bg-red-500 rounded-lg"
                  onClick={handleDoubleCheck}
                >
                  <TrashIcon />
                </button>
              </div>
            )}

            {acceptable && (
              <button
                className="px-2 py-2 bg-green-600 rounded-lg"
                onClick={handleStatus}
              >
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
