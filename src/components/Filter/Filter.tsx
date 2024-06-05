import { Post } from "@/interfaces/Post";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";

interface Props {
  posts: Post[];
  filter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Filter({ posts, filter, setFilter }: Props) {
  const activeStyle = "bg-sky-500 text-stone-900 border-sky-500 border";
  const inactiveStyle = "bg-stone-700 text-stone-50 border-stone-700 border";

  return (
    <>
      {posts?.length && (
        <div className="w-100 flex items-center justify-center gap-2 mb-2 text-xs">
          <div className="flex w-full">
            <button
              type="button"
              onClick={() => setFilter(false)}
              className={`px-2 py-4 rounded-l-xl w-full ${
                !filter ? activeStyle : inactiveStyle
              }`}
            >
              Show all
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
              </div>{" "}
              <div>Marked</div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
