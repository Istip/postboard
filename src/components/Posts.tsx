"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";

const Posts = () => {
  const [posts, setPosts] = useState([] as any[]);

  useEffect(() => {
    const fetchDada = async () => {
      const snapshot = await getDocs(collection(db, "posts"));

      let fetched: any[] = [];

      snapshot.forEach((doc) => fetched.push(doc.data()));

      setPosts(fetched);
    };

    fetchDada();
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
