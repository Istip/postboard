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
import useSpeech from "@/hooks/useSpeech";
import MicrophoneIcon from "./MicrophoneIcon";

export default function Footer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [hints, setHints] = useState<any[]>([]);
  const [filteredHints, setFilteredhints] = useState<any[]>([]);

  const {
    text: recordedText,
    startListening,
    hasRecognition,
    isListening,
    stopListening,
  } = useSpeech();

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

    const texts = text.split(",").map((t) => t.trim());

    const dataToSend: Post[] = texts.map((text) => ({
      text,
      createdAt: new Date(),
      type: formattedPathname,
      marked: false,
      done: false,
      displayName: user?.displayName,
      email: user?.email,
      photoUrl: user?.photoURL,
    }));

    const notificationsToSend: NotificationType[] = texts.map((text) => ({
      text,
      createdAt: new Date(),
      type: formattedPathname,
      displayName: user?.displayName,
      email: user?.email,
      photoUrl: user?.photoURL,
      seen: false,
    }));

    toastID = toast.loading("Creating new post..", { id: toastID });

    if (!text.length) {
      return toast.error("Enter a message!", { id: toastID });
    }

    setLoading(true);

    Promise.all(dataToSend.map((data) => addDoc(collection(db, "posts"), data)))
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

        Promise.all(
          notificationsToSend.map((notification) =>
            addDoc(collection(db, "notifications"), notification)
          )
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
        hint.text
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .toLowerCase()
          .includes(text.toLowerCase())
      );

      setFilteredhints(filtered);
    }
  }, [text, hints]);

  useEffect(() => {
    setText("");
    setText(recordedText);
  }, [recordedText]);

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

      <footer className="w-screen bg-stone-900 border-stone-800 border-t fixed bottom-0 px-4 py-2 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col sm:w-[450px]">
          {pageIsSubmit && (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="py-2 h-14 flex gap-2"
            >
              <div className="relative w-full">
                {text.length ? (
                  <button
                    className="absolute top-2 right-2 p-1 bg-red-500/75 rounded-xl"
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
                  className="w-full h-full bg-stone-800 p-2 rounded-md border-transparent border focus:outline-none overflow-hidden
                    disabled:opacity-50 disabled:cursor-not-allowed focus:border focus:border-stone-800 resize-none text-sm"
                />
              </div>
              {hasRecognition && (
                <button
                  type="button"
                  onTouchStart={startListening}
                  onTouchEnd={stopListening}
                  onClick={isListening ? stopListening : startListening}
                  className="h-full bg-red-500 rounded-md px-4 py-2 text-stone-950 font-bold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MicrophoneIcon size="15" />
                  <div className="text-sm hidden sm:block">Record</div>
                  <span className="sr-only">Record</span>
                </button>
              )}
              <button
                disabled={isListening}
                className="h-full bg-yellow-500 rounded-md px-4 py-2 text-stone-950 font-bold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusCircledIcon />
                <div className="text-sm hidden sm:block">Create</div>
                <span className="sr-only">Create</span>
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
