import { useState } from "react";
import { Post } from "@/interfaces/Post";
import Image from "next/image";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-hot-toast";
import { formatDateToYYYYMMDD } from "@/utils/formatDate";
import CommentOverlap from "./CommentOverlap";
import { useAuthContext } from "@/context/AuthContext";

const Comment: React.FC<{ post: Post | undefined; comment: any }> = ({
  post,
  comment,
}) => {
  const [overlap, setOverlap] = useState(false);
  const commentId = comment.id || "";

  const { user } = useAuthContext();

  const isUserCommenter = user?.email === comment?.email;

  // TODO: Add type for comment

  const handleDelete = () => {
    deleteDoc(doc(db, "comments", commentId))
      .then(() => {
        setOverlap(false);
        toast.error(() => (
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

  if (overlap && isUserCommenter) {
    return (
      <CommentOverlap
        comment={comment}
        post={post}
        handleDelete={handleDelete}
        setOverlap={setOverlap}
      />
    );
  }

  return (
    <div className="flex gap-4 mt-4" onClick={() => setOverlap(!overlap)}>
      <Image
        src={post?.photoUrl || "/avatar.bmp"}
        className="w-4 h-4 border rounded-full bg-slate-950 border-slate-500"
        width={24}
        height={24}
        alt={post?.displayName || ""}
      />
      <div className="flex gap-2 justify-between w-full font-light">
        <div>
          <div>{comment?.text}</div>
        </div>
        <p className="text-slate-400 text-[8px] tabular-nums">
          {formatDateToYYYYMMDD(comment.createdAt)}
        </p>
      </div>
    </div>
  );
};
export default Comment;
