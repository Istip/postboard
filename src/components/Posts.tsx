"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";

const Posts = () => {
  const [posts, setPosts] = useState([] as any[]);

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

  if (!posts.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {posts.map((post, index) => {
          return <li key={index}>{post.text}</li>;
        })}
      </ul>
    </div>
  );
};
export default Posts;
