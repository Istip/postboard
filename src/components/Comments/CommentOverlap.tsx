import { Post } from "@/interfaces/Post";
import { ArrowRightIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface CommentOverlapInterface {
  // TODO: update type when comment type is ready
  comment: any;
  post: Post | undefined;
  handleDelete: () => void;
  setOverlap: (value: React.SetStateAction<boolean>) => void;
}

const CommentOverlap: React.FC<CommentOverlapInterface> = ({
  comment,
  post,
  handleDelete,
  setOverlap,
}) => {
  return (
    <div className="w-100 mt-4 left-0 right-0 flex flex-col bg-stone-800 text-xs p-2 rounded-md font-light">
      <div className="flex gap-2 mb-2">
        <Image
          src={post?.photoUrl || "/avatar.bmp"}
          className="w-4 h-4 border rounded-full bg-stone-950 border-white"
          width={24}
          height={24}
          alt={post?.displayName || ""}
        />
        <div className="mb-1">{comment?.text}</div>
      </div>
      <div className="flex">
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 px-2 py-1 rounded-l flex items-center gap-1 justify-center"
        >
          <TrashIcon />
          DELETE
        </button>
        <button
          className="w-full bg-stone-700 px-2 py-1 rounded-r flex items-center gap-1 justify-center"
          onClick={() => setOverlap(false)}
        >
          <ArrowRightIcon />
          CANCEL
        </button>
      </div>
    </div>
  );
};
export default CommentOverlap;
