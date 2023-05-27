"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Post } from "@/interfaces/Post";
import { toast } from "react-hot-toast";
import Comment from "./Comment";

const Comments: React.FC<{ post: Post | undefined }> = ({ post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  // TODO: delete comments that are related to any post

  // TODO: fix rerender every time input is changeing

  let toastID: string;

  const handleSubmit = () => {
    toastID = toast.loading("Addind your comment...", { id: toastID });

    if (!comment.length) {
      return toast.error("Enter a comment!", { id: toastID });
    }

    const dataToSend = {
      text: comment,
      id: post?.id,
      displayName: post?.displayName,
      email: post?.email,
      photoUrl: post?.photoUrl,
    };

    setLoading(true);

    addDoc(collection(db, "comments"), dataToSend)
      .then(() => {
        toast.success(
          () => (
            <div>
              <span className="font-bold text-md">{`${comment}`}</span>{" "}
              <span className="opacity-75">comment posted!</span>
            </div>
          ),
          { id: toastID }
        );
      })
      .catch(() => {
        toast.error("Please try again!", { id: toastID });
      })
      .finally(() => {
        setLoading(false);
        setComment("");
      });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "comments"), where("id", "==", post?.id)),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          createdAt: Date.now(),
          id: doc.id,
        }));

        setComments(data);
      }
    );

    return () => unsubscribe();
  }, [post?.id]);

  return (
    <div className="bg-slate-800 bg-opacity-30 p-4 mt-4 rounded-md text-xs">
      {comments.length ? (
        <div className="text-xs font-bold text-slate-500">Comments:</div>
      ) : null}

      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} post={post} />
      ))}

      <div
        className={`flex gap-4 ${comments?.length ? "mt-4" : ""} items-center`}
      >
        <Image
          src={post?.photoUrl || "/avatar.bmp"}
          className="w-4 h-4 border rounded-full bg-slate-950 border-white"
          width={24}
          height={24}
          alt={post?.displayName || ""}
        />

        <div className="w-full flex gap-2">
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            disabled={loading}
            type="text"
            placeholder="Leave a comment..."
            className="text-xs w-full bg-slate-900 rounded-md px-2 border-transparent border focus:outline-none focus:border focus:border-slate-950"
          />
          <button
            onClick={handleSubmit}
            className={`px-4 py-1 bg-yellow-500 text-slate-900 font-bold rounded-md flex items-center gap-1 disabled:opacity-50
             ${loading && "cursor-not-allowed"}`}
            disabled={loading}
          >
            <div>
              <PaperPlaneIcon />
            </div>
            <p className="uppercase">POST</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Comments;
