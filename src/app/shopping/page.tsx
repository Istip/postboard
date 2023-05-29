"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Post } from "@/interfaces/Post";
import Card from "@/components/Card/Card";
import Loading from "@/components/Loading/Loading";
import Message from "@/components/Message/Message";
import Toaster from "@/components/Toaster/Toaster";

export default function Shopping() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), where("type", "==", "shopping")),
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

  if (!posts) {
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

        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </main>
    </>
  );
}
