import { ArrowRightIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface CommentOverlapInterface {
  // TODO: update type when comment type is ready
  comment: any;
  handleDelete: () => void;
  setOverlap: any;
}

const CommentOverlap: React.FC<CommentOverlapInterface> = ({
  comment,
  handleDelete,
  setOverlap,
}) => {
  return (
    <div className="w-full mt-4 left-0 right-0 flex flex-col bg-zinc-800 text-xs p-2 rounded-md font-light">
      <div className="flex gap-2 mb-2">
        <Image
          src={comment?.photoUrl || "/avatar.jpg"}
          className="w-4 h-4 border rounded-full bg-zinc-950 border-white"
          width={24}
          height={24}
          alt={comment?.displayName || ""}
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
          className="w-full bg-zinc-700 px-2 py-1 rounded-r flex items-center gap-1 justify-center"
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
