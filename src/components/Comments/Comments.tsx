"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { NotificationType } from "@/interfaces/Notification";
import { Post } from "@/interfaces/Post";
import Comment from "./Comment";

const Comments: React.FC<{
  post: Post | undefined;
  showComments?: boolean;
}> = ({ post, showComments }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  let toastID: string;

  const handleSubmit = () => {
    toastID = toast.loading("Addind your comment...", { id: toastID });

    if (!comment.length) {
      return toast.error("Enter a comment!", { id: toastID });
    }

    const dataToSend = {
      text: comment,
      id: post?.id,
      displayName: user?.displayName,
      email: user?.email,
      photoUrl: user?.photoURL,
      createdAt: Date.now(),
    };

    const notificationToSend: NotificationType = {
      text: comment,
      createdAt: new Date(),
      type: "comment",
      displayName: user?.displayName,
      email: user?.email,
      photoUrl: user?.photoURL,
      seen: false,
      post: post?.text,
    };

    setLoading(true);

    addDoc(collection(db, "comments"), dataToSend)
      .then(() => {
        setComment("");

        toast.success(
          () => (
            <div>
              <span className="font-bold text-md">{`${comment}`}</span>{" "}
              <span className="opacity-75">comment posted!</span>
            </div>
          ),
          { id: toastID }
        );

        addDoc(collection(db, "notifications"), notificationToSend);
      })
      .catch(() => {
        toast.error("Please try again!", { id: toastID });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onSnapshot(
      query(
        collection(db, "comments"),
        where("id", "==", post?.id),
        orderBy("createdAt")
      ),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setComments(data);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [post?.id]);

  return (
    <div
      className={`${
        comments?.length ? "py-4 p-2" : "p-2"
      } mt-4 rounded-2xl text-xs`}
    >
      {comments.length ? (
        <div className="text-xs font-bold text-zinc-500">Comments:</div>
      ) : null}

      {showComments && (
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="py-0.5">
                <Comment comment={comment} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      <div
        className={`flex gap-4 ${comments?.length ? "mt-4" : ""} items-center`}
      >
        <Image
          src={user?.photoURL || "/avatar.jpg"}
          className="w-4 h-4 border rounded-full bg-zinc-950 border-zinc-500"
          width={24}
          height={24}
          alt={user?.displayName || ""}
        />

        <div className="w-full flex">
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            disabled={loading}
            type="text"
            placeholder="Leave a comment..."
            className="text-xs w-full bg-zinc-800 rounded-l-md px-2 border-transparent border focus:outline-none focus:border focus:border-zinc-950"
          />
          <button
            onClick={handleSubmit}
            className={`px-4 py-1 bg-yellow-500 text-zinc-900 font-bold rounded-r-md flex items-center gap-1 disabled:opacity-50
             ${loading && "cursor-not-allowed"}`}
            disabled={loading}
          >
            <div>
              <PlusCircledIcon />
            </div>
            <p className="uppercase">ADD</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Comments;
