"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { Post } from "@/interfaces/Post";
import ItemCard from "@/components/Card/ItemCard";
import Loading from "@/components/Loading/Loading";
import Message from "@/components/Message/Message";
import Toaster from "@/components/Toaster/Toaster";
import { BookmarkFilledIcon, CheckCircledIcon } from "@radix-ui/react-icons";

export default function Shopping() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("type", "==", "shopping"),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        const data: any[] = [];

        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });

        setPosts(data);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!posts.length) {
    return <Loading title="Loading shopping list" />;
  }

  return (
    <>
      <Toaster />
      <main>
        {!posts?.length && (
          <Message type="warning">
            You have nothing on yout shopping list
          </Message>
        )}

        {posts?.length && (
          <div className="w-100 flex items-center justify-center gap-2 mb-2 text-xs">
            <button
              type="button"
              onClick={() => setDone(!done)}
              className={`p-2 bg-green-500 rounded-md ${
                done ? "" : "opacity-50"
              }`}
            >
              <CheckCircledIcon />
            </button>

            <div className="flex">
              <button
                type="button"
                onClick={() => setFilter(false)}
                className={`p-2 rounded-l-md ${
                  !filter ? "bg-yellow-500" : "bg-stone-700"
                }`}
              >
                Show all
              </button>
              <button
                type="button"
                onClick={() => setFilter(true)}
                className={`p-2 flex items-center gap-1 rounded-r-md ${
                  filter ? "bg-yellow-500" : "bg-stone-700"
                }`}
              >
                <BookmarkFilledIcon /> Marked
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-1">
          <AnimatePresence>
            {posts
              .filter((post) => {
                if (!filter) return true;
                return post.marked;
              })
              .filter((post) => {
                if (!done) return true;
                return !post.done;
              })
              .map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="py-0.5">
                    <ItemCard post={post} comments={false} />
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
