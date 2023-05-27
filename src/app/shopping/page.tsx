"use client";

import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Post } from "@/interfaces/Post";
import Card from "@/components/Card/Card";
import Loading from "@/components/Loading/Loading";
import Message from "@/components/Message/Message";

export default function Shopping() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const data: any[] = [];

      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setPosts(data);
    });

    return () => unsubscribe();
  }, []);

  if (!posts) {
    return <Loading title="Loading shopping list" />;
  }

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: "#16a34a",
              color: "white",
              fontSize: 12,
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "white",
              fontSize: 12,
            },
          },
          loading: {
            style: {
              background: "#141c30",
              color: "white",
              fontSize: 12,
              border: "1px solid #1e293b",
            },
          },
          style: {
            width: "100%",
          },
        }}
      />
      <main>
        {!posts?.length && (
          <Message type="warning">
            You have nothing on yout shopping list
          </Message>
        )}

        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </main>
    </>
  );
}
