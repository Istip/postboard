"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { PlusCircledIcon, Cross2Icon } from "@radix-ui/react-icons";
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
import { NotificationType } from "@/interfaces/Notification";
import FooterHint from "./FooterHint";
import FooterMenu from "./FooterMenu";

export default function Footer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [hints, setHints] = useState<any[]>([]);
  const [filteredHints, setFilteredhints] = useState<any[]>([]);

  const { user } = useAuthContext();

  const pathname = usePathname();
  const submitPages = ["shopping", "notes"];
  const formattedPathname = pathname.substring(1, pathname.length);
  const pageIsSubmit = submitPages.includes(formattedPathname);
  const isShopping = pathname === "/shopping";

  const createString =
    formattedPathname === "notes"
      ? "added to the notes!"
      : "added to the shopping list!";

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

    const notificationToSend: NotificationType = {
      text,
      createdAt: new Date(),
      type: formattedPathname,
      displayName: user?.displayName,
      email: user?.email,
      photoUrl: user?.photoURL,
      seen: false,
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
              <span className="opacity-75">{createString}</span>
            </div>
          ),
          { id: toastID }
        );

        addDoc(collection(db, "notifications"), notificationToSend);
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
        hint.text
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .toLowerCase()
          .includes(text.toLowerCase())
      );

      setFilteredhints(filtered);
    }
  }, [text, hints]);

  if (!user) {
    return null;
  }

  return (
    <>
      <FooterHint
        isShopping={isShopping}
        text={text}
        filteredHints={filteredHints}
      />

      <footer className="w-screen bg-slate-900 border-slate-800 border-t fixed bottom-0 px-4 py-2 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col sm:w-[450px]">
          {pageIsSubmit && (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="py-2 h-16 flex gap-2"
            >
              <div className="relative w-full">
                {text.length ? (
                  <button
                    className="absolute top-3 right-2 py-1 px-2"
                    onClick={() => setText("")}
                  >
                    <Cross2Icon />
                  </button>
                ) : null}
                <textarea
                  onChange={handleChange}
                  value={text}
                  disabled={loading}
                  placeholder="Enter your text..."
                  className="w-full h-full bg-slate-800 p-2 rounded-md border-transparent border focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed focus:border focus:border-slate-800 resize-none text-sm"
                />
              </div>
              <button className="h-full bg-yellow-500 rounded-md px-4 py-2 text-slate-950 font-bold flex items-center gap-1.5">
                <PlusCircledIcon />
                <div className="text-sm hidden sm:block">Create</div>
              </button>
            </form>
          )}
          <div className="flex items-center rounded-md justify-between sm:justify-center gap-4 w-full pb-2">
            <FooterMenu />
          </div>
        </div>
      </footer>
    </>
  );
}
