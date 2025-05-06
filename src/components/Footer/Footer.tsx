"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "@/context/AuthContext";
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
import useSpeech from "@/hooks/useSpeech";
import Notifications from "../Notification/Notifications";
import { AnimatePresence, motion } from "framer-motion";
import FooterContent from "./FooterContent";

export default function Footer() {
  const [notifications, setNotifications] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [hints, setHints] = useState<any[]>([]);
  const [filteredHints, setFilteredhints] = useState<any[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user } = useAuthContext();

  const {
    text: recordedText,
    startListening,
    hasRecognition,
    isListening,
    stopListening,
  } = useSpeech();

  const formattedPathname = pathname.substring(1, pathname.length);
  const isShopping = pathname === "/shopping";

  const createString =
    formattedPathname === "notes"
      ? "added to the notes!"
      : "added to the shopping list!";

  const toggleNotifications = () => {
    setNotifications((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  let toastID: string;
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  return (
    <>
      {user ? (
        <>
          {notifications && (
            <div className="h-screen pointer-events-auto fixed top-0 w-screen left-0 z-10 bg-zinc-950/90" />
          )}
          <FooterHint
            isShopping={isShopping}
            text={text}
            filteredHints={filteredHints}
          />
          <footer className="w-screen bg-zinc-900 border-zinc-800 border-t fixed bottom-0 z-20 px-4 pb-2">
            <div
              className="w-full justify-center gap-2 flex items-center p-3 cursor-pointer"
              onClick={toggleNotifications}
            >
              <div className="flex items-center justify-center bg-zinc-950/75 rounded-full h-2 w-20 hover:w-32 transition-all" />
            </div>
            <div className="flex items-center justify-center" ref={contentRef}>
              <FooterContent
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                text={text}
                loading={loading}
                startListening={startListening}
                stopListening={stopListening}
                isListening={isListening}
                hasRecognition={hasRecognition}
                setText={setText}
                setNotifications={setNotifications}
                notifications={notifications}
              />
            </div>
            <AnimatePresence>
              {notifications && (
                <motion.div
                  className="h-[200px]"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <Notifications />
                </motion.div>
              )}
            </AnimatePresence>
          </footer>
        </>
      ) : null}
    </>
  );
}
