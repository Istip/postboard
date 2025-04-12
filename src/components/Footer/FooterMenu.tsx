import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FileIcon, ListBulletIcon } from "@radix-ui/react-icons";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

const footerMenu = [
  {
    title: "shopping",
    icon: <ListBulletIcon />,
  },
  {
    title: "notes",
    icon: <FileIcon />,
  },
];

const FooterMenu = () => {
  const [current, setCurrent] = useState("/shopping");
  const [shoppingCount, setShoppingCount] = useState<number | null>(null);
  const [notesCount, setNotesCount] = useState<number | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const col = collection(db, "posts");
      const shoppingQuery = query(col, where("type", "==", "shopping"));
      const notesQuery = query(col, where("type", "==", "notes"));

      const shoppingCount = await getCountFromServer(shoppingQuery);
      const notesCount = await getCountFromServer(notesQuery);

      setShoppingCount(shoppingCount.data().count);
      setNotesCount(notesCount.data().count);
    };

    fetchData();
  }, [shoppingCount, notesCount]);

  const isCountFetched = shoppingCount !== null && notesCount !== null;

  return (
    <>
      {footerMenu.map((item, i) => {
        return (
          <Link
            onClick={() => current !== item.title && setCurrent(item.title)}
            href={item.title}
            key={item.title}
            className={`${
              pathname === `/${item.title}`
                ? "bg-amber-500 text-zinc-950"
                : "text-white border-b border-transparent"
            } p-4 flex items-center justify-center rounded-xl w-full`}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <div className="flex items-center justify-center gap-4">
              <div className="font-bold text-xs">{item.icon}</div>
              <div className="text-sm font-bold ml-2 hidden sm:block">
                {item.title.toUpperCase()}
              </div>
              <span className="sr-only">{item.title.toUpperCase()}</span>

              {isCountFetched && (
                <div className="text-[8px] w-4 h-4 flex items-center justify-center opacity-50 font-bold bg-zinc-600 rounded-full ">
                  {i === 0 ? shoppingCount : notesCount}
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </>
  );
};
export default FooterMenu;
