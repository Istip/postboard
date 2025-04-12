import { Post } from "@/interfaces/Post";
import { BookmarkFilledIcon, DashboardIcon } from "@radix-ui/react-icons";

interface Props {
  posts: Post[];
  filter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Filter({ posts, filter, setFilter }: Props) {
  const activeStyle = "bg-zinc-900 text-zinc-50 border border-zinc-800";
  const inactiveStyle = "bg-zinc-800 text-zinc-50/25 border border-zinc-800";

  return (
    <>
      {posts?.length && (
        <div className="flex items-center justify-center gap-2 mb-2 text-xs">
          <div className="flex w-full">
            <button
              type="button"
              onClick={() => setFilter(false)}
              className={`px-2 py-4 flex items-center justify-center w-full gap-1 rounded-l-xl ${
                !filter ? activeStyle : inactiveStyle
              }`}
            >
              <div>
                <DashboardIcon />
              </div>
              <div>Show all</div>
            </button>
            <button
              type="button"
              onClick={() => setFilter(true)}
              className={`px-2 py-4 flex items-center justify-center w-full gap-1 rounded-r-xl ${
                filter ? activeStyle : inactiveStyle
              }`}
            >
              <div>
                <BookmarkFilledIcon />
              </div>
              <div>Marked</div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
