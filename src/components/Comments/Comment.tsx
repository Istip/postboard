import { useState } from "react";
import { Post } from "@/interfaces/Post";
import Image from "next/image";
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-hot-toast";

const Comment: React.FC<{ post: Post | undefined; comment: any }> = ({
  post,
  comment,
}) => {
  const [overlap, setOverlap] = useState(false);
  const [loading, setLoading] = useState(false);
  const commentId = comment.id || "";

  const handleDelete = () => {
    deleteDoc(doc(db, "comments", commentId))
      .then(() => {
        setOverlap(false);
        toast.success(() => (
          <div>
            <span className="font-bold text-md items-center">{`${comment?.text}`}</span>{" "}
            <span className="opacity-75">comment has been removed!</span>
          </div>
        ));
      })
      .catch(() => {
        toast.error("Something went wrong! Please try again!");
      });
  };

  if (overlap) {
    return (
      <div className="w-100 mt-4 left-0 right-0 flex flex-col bg-slate-800 text-xs p-2 rounded-md font-light">
        <div className="flex gap-2 mb-2">
          <Image
            src={post?.photoUrl || "/avatar.bmp"}
            className="w-4 h-4 border rounded-full bg-slate-950 border-white"
            width={24}
            height={24}
            alt={post?.displayName || ""}
          />
          <div className="mb-1">{comment?.text}</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 px-2 py-1 rounded-l flex items-center gap-1 justify-center"
          >
            <TrashIcon /> DELETE
          </button>
          <button
            className="w-full bg-slate-700 px-2 py-1 rounded-r flex items-center gap-1 justify-center"
            onClick={() => setOverlap(false)}
          >
            <ArrowLeftIcon /> CANCEL
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4 mt-4" onClick={() => setOverlap(!overlap)}>
        <Image
          src={post?.photoUrl || "/avatar.bmp"}
          className="w-4 h-4 border rounded-full bg-slate-950 border-white"
          width={24}
          height={24}
          alt={post?.displayName || ""}
        />

        <div>{comment?.text}</div>
      </div>
    </>
  );
};
export default Comment;
