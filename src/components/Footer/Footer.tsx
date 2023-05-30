"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import {
  PlusCircledIcon,
  ListBulletIcon,
  ChatBubbleIcon,
  BellIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-hot-toast";
import { Post } from "@/interfaces/Post";

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

export default function Footer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState("/shopping");
  const [hints, setHints] = useState<any[]>([]);
  const [filteredHints, setFilteredhints] = useState<any[]>([]);

  const { user } = useAuthContext();

  const pathname = usePathname();
  const submitPages = ["shopping", "notes"];
  const formattedPathname = pathname.substring(1, pathname.length);
  const pageIsSubmit = submitPages.includes(formattedPathname);
  const isShopping = pathname === "/shopping";

  let toastID: string;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend: Post = {
      text,
      createdAt: new Date(),
      type: formattedPathname,
      marked: false,
      done: false,
      displayName: user?.displayName,
      email: user?.email,
      photoUrl: user?.photoURL,
    };

    toastID = toast.loading("Creating new post..", { id: toastID });

    if (!text.length) {
      return toast.error("Enter a message!", { id: toastID });
    }

    setLoading(true);

    addDoc(collection(db, "posts"), dataToSend)
      .then(() => {
        toast.success(
          () => (
            <div>
              <span className="font-bold text-md">{`${text}`}</span>{" "}
              <span className="opacity-75">added to the shopping list!</span>
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
        setText("");
      });
  };

  useEffect(() => {
    if (isShopping) {
      const unsubscribe = onSnapshot(
        query(collection(db, "posts"), where("type", "==", "shopping")),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setHints(data as any);
          setFilteredhints(data as any);
        }
      );

      return () => unsubscribe();
    }
    // eslint-disable-next-line
  }, [pathname, hints.length]);

  useEffect(() => {
    if (text.length) {
      const filtered = hints.filter((hint) =>
        hint.text.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredhints(filtered);

      console.log(filtered);
    }
  }, [text, hints]);

  if (!user) {
    return null;
  }

  return (
    <>
      {isShopping && text.length && filteredHints.length ? (
        <div className="bg-slate-800 border border-slate-700 fixed w-auto overflow-x-scroll left-2 right-2 rounded-2xl p-2 bottom-36 flex items-center gap-2">
          {filteredHints.length > 1 && (
            <div className="rounded-lg text-xs font-extrabold py-2 px-4 bg-green-600 text-slate-50">
              {filteredHints.length}
            </div>
          )}

          {filteredHints.map((hint) => (
            <div
              key={hint.id}
              className="rounded-lg text-xs font-light bg-slate-700 p-2 whitespace-nowrap"
            >
              {hint.text}
            </div>
          ))}
        </div>
      ) : null}

      <footer className="w-screen bg-slate-900 border-slate-800 border-t fixed bottom-0 px-4 py-2 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col sm:w-[450px]">
          {pageIsSubmit && (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="py-2 h-16 flex gap-2"
            >
              <textarea
                onChange={handleChange}
                value={text}
                disabled={loading}
                placeholder="Enter your text..."
                className="w-full h-full bg-slate-800 p-2 rounded-md border-transparent border focus:outline-none
                  disabled:opacity-50 disabled:cursor-not-allowed focus:border focus:border-slate-800 resize-none text-sm"
              />
              <button className="h-full bg-yellow-500 rounded-md px-4 py-2 text-slate-950 font-bold flex items-center gap-1.5">
                <PlusCircledIcon />
                <div className="text-sm hidden sm:block">Create</div>
              </button>
            </form>
          )}
          <div className="flex items-center rounded-md justify-between sm:justify-center gap-4 w-full pb-2">
            {menu.map((item) => {
              return (
                <Link
                  onClick={() =>
                    current !== item.title && setCurrent(item.title)
                  }
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
                      className="relative font-bold w-4 h-4 bg-red-700 flex items-center justify-center rounded-full ml-2 text-white"
                      style={{ fontSize: 8 }}
                    >
                      <span className="animate-ping bg-red-700 absolute inline-flex h-full w-full rounded-full opacity-75" />
                      <span>{item.bagde}</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
}
