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
import Card from "@/components/Card/Card";
import Loading from "@/components/Loading/Loading";
import Message from "@/components/Message/Message";
import Toaster from "@/components/Toaster/Toaster";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";

export default function Shopping() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState(false);

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

        <div className="w-100 flex items-center justify-center gap-1 mb-2 text-sm">
          <div className="flex">
            <button
              type="button"
              onClick={() => setFilter(false)}
              className={`px-4 py-2 ${
                !filter ? "bg-yellow-500" : "bg-slate-700"
              } rounded-l-md`}
            >
              Show all
            </button>
            <button
              type="button"
              onClick={() => setFilter(true)}
              className={`px-4 py-2 flex items-center gap-1 ${
                filter ? "bg-yellow-500" : "bg-slate-700"
              } rounded-r-md`}
            >
              <BookmarkFilledIcon /> Marked
            </button>
          </div>
        </div>

        <AnimatePresence>
          {posts
            .filter((post) => {
              if (!filter) return true;
              return post.marked;
            })
            .map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="py-0.5">
                  <Card post={post} comments={false} />
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </main>
    </>
  );
}
