"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
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
import Filter from "@/components/Filter/Filter";
import { TriangleDownIcon } from "@radix-ui/react-icons";

export default function Shopping() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState(false);

  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

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

  if (!user) {
    return <Loading title="Redirecting" />;
  }

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
        <Filter posts={posts} filter={filter} setFilter={setFilter} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1">
          <AnimatePresence>
            {posts
              .filter((post) => {
                if (!filter) return true;
                return post.marked;
              })
              .filter((post) => {
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

        {posts.some((post) => post.done) && (
          <div className="font-bold mt-6 mb-2 flex items-center gap-1">
            Recent
            <span>
              <TriangleDownIcon />
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1">
          <AnimatePresence>
            {posts
              .filter((post) => {
                return post.done;
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
