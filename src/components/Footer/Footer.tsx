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

  const {
    text: recordedText,
    startListening,
    hasRecognition,
    isListening,
    stopListening,
  } = useSpeech();

  const { user } = useAuthContext();

  const pathname = usePathname();
  const formattedPathname = pathname.substring(1, pathname.length);
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

  const contentRef = useRef<HTMLDivElement>(null);

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

      <footer className="w-screen bg-stone-900 border-stone-800 border-t fixed bottom-0 px-4 py-2">
        <div className="w-full justify-center flex items-center pb-2">
          <div className="flex items-center justify-center h-1 bg-stone-950/50 w-20 rounded-full" />
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
  );
}
