import { useState } from "react";
import { Post } from "@/interfaces/Post";
import Image from "next/image";
import { ArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";

const Comment: React.FC<{ post: Post | undefined; comment: any }> = ({
  post,
  comment,
}) => {
  const [overlap, setOverlap] = useState(false);

  if (overlap) {
    return (
      <div className="w-100 left-0 right-0 flex gap-2 bg-slate-800 text-xs p-2 rounded-md font-light">
        <button className="w-full bg-red-500 px-2 py-1 rounded-l flex items-center gap-1 justify-center">
          <TrashIcon /> DELETE
        </button>
        <button
          className="w-full bg-slate-600 px-2 py-1 rounded-r flex items-center gap-1 justify-center"
          onClick={() => setOverlap(false)}
        >
          <ArrowLeftIcon /> CANCEL
        </button>
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
