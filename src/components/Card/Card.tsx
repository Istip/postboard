import { useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  CheckCircledIcon,
  EyeClosedIcon,
  EyeOpenIcon,
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
import { convertTimestamp } from "@/utils/formatDate";
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

const Card: React.FC<CardProps> = ({
  post,
  acceptable = true,
  comments = true,
}) => {
  const [confirm, setConfirm] = useState(false);
  const [value, setValue] = useState(post?.text as string);
  const [showComments, setShowComments] = useState(true);

  const pathname = usePathname();

  const deleteString =
    pathname.slice(1, pathname.length) === "notes"
      ? "has been removed from notes!"
      : "has been removed from the shopping list!";

  const postId = post?.id || "";
  const cardOpacity = post?.done ? "opacity-50" : "";
  const cardBorder = !post?.marked
    ? "border-opacity-50 border-transparent"
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

  const toggleComments = () => setShowComments((prev) => !prev);
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
      className={`mb-3 text-stone-200 rounded-lg border overflow-hidden ${cardOpacity} ${cardBorder}`}
    >
      <div className="bg-stone-900 p-4 text-sm rounded-t-lg">
        <div className="text-lg font-light flex items-start justify-between">
          <div className="w-full">
            <input
              className="w-full text-stone-50 bg-transparent outline-none focus:bg-stone-700/20 py-1 rounded-lg"
              onChange={handleChange}
              placeholder="Please type here..."
              value={value}
              onBlur={handleSaveOnBlur}
            />
          </div>

          <div className="text-stone-600 font-bold text-sm pl-1 flex gap-2 items-center h-8">
            <button onClick={toggleComments}>
              <div className="sr-only">
                {showComments ? "Hide comments" : "Show comments"}
              </div>
              <div className="text-yellow-500">
                {showComments ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </div>
            </button>

            <button className="text-yellow-500" onClick={handleMark}>
              <div className="sr-only">
                {!post?.marked ? "Bookmark this post" : "Remove from bookmarks"}
              </div>
              {!post?.marked ? <BookmarkIcon /> : <BookmarkFilledIcon />}
            </button>
          </div>
        </div>

        {comments && <Comments post={post} showComments={showComments} />}
      </div>

      <div className="w-full p-2 bg-stone-900 flex gap-2 justify-between items-center rounded-b-xl border-t-stone-950 border-t">
        <div className="w-full flex items-center justify-between">
          <div className="text-xs flex gap-2 text-stone-500 items-center justify-center">
            <div className="rounded-full bg-stone-950">
              <Image
                src={post?.photoUrl || "/avatar.jpg"}
                className="w-6 h-6 border rounded-full bg-stone-950 border-stone-500"
                width={24}
                height={24}
                alt={post?.displayName || ""}
              />
            </div>
            <p>{convertTimestamp(post?.createdAt)}</p>
          </div>

          <div className="flex gap-2">
            {confirm ? (
              <div>
                <div className="flex">
                  <button
                    className="px-4 py-2 bg-red-500 rounded-l-lg"
                    onClick={handleDelete}
                  >
                    <div className="sr-only">Remove</div>
                    <TrashIcon />
                  </button>
                  <button
                    className="px-4 py-2 bg-stone-700 rounded-r-lg"
                    onClick={handleCancellation}
                  >
                    <div className="sr-only">Cancel remove</div>
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  className="px-4 py-2 bg-red-500 rounded-lg"
                  onClick={handleDoubleCheck}
                >
                  <div className="sr-only">Remove</div>
                  <TrashIcon />
                </button>
              </div>
            )}

            {acceptable && (
              <button
                className="px-4 py-2 bg-green-600 rounded-lg"
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
export default Card;
