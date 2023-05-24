"use client";

import { useAuthContext } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Card from "@/components/Card/Card";
import Loading from "@/components/Loading/Loading";

export default function Shopping() {
  const [posts, setPosts] = useState<any[] | null>(null);

  const { user } = useAuthContext();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const data: any[] = [];

      snapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setPosts(data);
    });

    return () => unsubscribe();
  }, []);

  if (!posts) {
    return <Loading title="Fetching data for" />;
  }

  return (
    <>
      <Toaster
        toastOptions={{
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
        {!posts?.length && <div>No posts found</div>}

        {posts.map((post, index) => (
          <Card key={index} user={user} post={post} />
        ))}
      </main>
    </>
  );
}
