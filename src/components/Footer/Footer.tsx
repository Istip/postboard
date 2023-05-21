"use client";

import { useAuthContext } from "@/context/AuthContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  PlusCircledIcon,
  ListBulletIcon,
  ChatBubbleIcon,
  BellIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [current, setCurrent] = useLocalStorage(
    "postboard_last_page",
    "/shopping"
  );

  const { user } = useAuthContext();

  const pathname = usePathname();

  const menu = [
    {
      title: "shopping",
      icon: <ListBulletIcon />,
      bagde: null,
    },
    {
      title: "notes",
      icon: <ChatBubbleIcon />,
      bagde: null,
    },
    {
      title: "notifications",
      icon: <BellIcon />,
      bagde: 10,
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <footer className="w-screen bg-slate-900 border-slate-800 border-t fixed bottom-0 px-4 py-2 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col sm:w-[450px]">
        <div className="py-2 h-16 flex gap-2">
          <textarea
            placeholder="Enter your text..."
            className="w-full h-full bg-slate-800 p-2 rounded-md border-transparent border focus:outline-none focus:border focus:border-slate-800 resize-none text-sm"
          />
          <button className="h-full bg-yellow-500 rounded-md px-4 py-2 text-slate-950 font-bold flex items-center gap-1.5">
            <PlusCircledIcon />
            <div className="text-sm hidden sm:block">Create</div>
          </button>
        </div>

        <div className="flex items-center rounded-md justify-between sm:justify-center gap-4 w-full pb-2">
          {menu.map((item) => {
            return (
              <Link
                onClick={() => current !== item.title && setCurrent(item.title)}
                href={item.title}
                key={item.title}
                className={`${
                  pathname === `/${item.title}`
                    ? "text-yellow-500 border-b border-yellow-500 "
                    : "text-white border-b border-transparent"
                } p-4 flex items-center justify-center rounded-t-md w-full`}
              >
                <div className="font-bold text-xs">{item.icon}</div>

                <div className="text-sm font-bold ml-2 hidden sm:block">
                  {item.title.toUpperCase()}
                </div>

                {item?.bagde && (
                  <div
                    className="font-bold w-4 h-4 bg-red-700 flex items-center justify-center rounded-full ml-2 text-white"
                    style={{ fontSize: 8 }}
                  >
                    {item.bagde}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
