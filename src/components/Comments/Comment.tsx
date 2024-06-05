import { useState } from "react";
import { Post } from "@/interfaces/Post";
import Image from "next/image";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-hot-toast";
import { formatDateToYYYYMMDD } from "@/utils/formatDate";
import CommentOverlap from "./CommentOverlap";
import { motion } from "framer-motion";

const Comment: React.FC<{ post: Post | undefined; comment: any }> = ({
  post,
  comment,
}) => {
  const [overlap, setOverlap] = useState(false);
  const commentId = comment.id || "";

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

  if (overlap) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
      >
        <CommentOverlap
          comment={comment}
          post={post}
          handleDelete={handleDelete}
          setOverlap={setOverlap}
        />
      </motion.div>
    );
  }

  return (
    <div className="flex gap-4 mt-3" onClick={() => setOverlap(!overlap)}>
      <Image
        src={comment?.photoUrl || "/avatar.jpg"}
        className="w-4 h-4 border rounded-full bg-stone-950 border-stone-500"
        width={24}
        height={24}
        alt={comment?.displayName || ""}
      />
      <div className="flex gap-2 justify-between w-full font-light">
        <div>
          <div>{comment?.text}</div>
        </div>
        <p className="text-stone-400 text-[8px] tabular-nums">
          {formatDateToYYYYMMDD(comment.createdAt)}
        </p>
      </div>
    </div>
  );
};
export default Comment;
