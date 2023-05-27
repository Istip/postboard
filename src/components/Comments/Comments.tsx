import { Post } from "@/interfaces/Post";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const Comments: React.FC<{ post: Post | undefined }> = ({ post }) => {
  return (
    <div className="bg-slate-800 bg-opacity-30 p-4 mt-4 rounded-md text-xs">
      <div className="text-xs font-bold text-slate-500">Comments:</div>

      <div className=" text-slate-300" style={{ fontSize: 10 }}>
        <div className="flex gap-4 mt-4">
          <Image
            src={post?.photoUrl || "/avatar.bmp"}
            className="w-4 h-4 border rounded-full bg-slate-950 border-white"
            width={24}
            height={24}
            alt={post?.displayName || ""}
          />

          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae cumque
            tenetur quia incidunt vel dolores aliquam id excepturi facere,
            perspiciatis earum porro inventore nam. Quia iure esse autem cumque
            molestiae.
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Image
            src={post?.photoUrl || "/avatar.bmp"}
            className="w-4 h-4 border rounded-full bg-slate-950 border-white"
            width={24}
            height={24}
            alt={post?.displayName || ""}
          />

          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            sequi nulla nihil!
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-4 items-center">
        <Image
          src={post?.photoUrl || "/avatar.bmp"}
          className="w-4 h-4 border rounded-full bg-slate-950 border-white"
          width={24}
          height={24}
          alt={post?.displayName || ""}
        />

        <div className="w-full flex gap-2">
          <input
            type="text"
            placeholder="Leave a comment..."
            className="text-xs w-full bg-slate-900 rounded-md px-2 border-transparent border focus:outline-none focus:border focus:border-slate-950"
          />
          <button className="px-4 py-1 bg-yellow-500 text-slate-900 font-bold rounded-md flex items-center gap-1">
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
