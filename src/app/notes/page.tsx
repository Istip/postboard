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
import { Post } from "@/interfaces/Post";
import Loading from "@/components/Loading/Loading";
import Message from "@/components/Message/Message";
import Card from "@/components/Card/Card";
import Toaster from "@/components/Toaster/Toaster";

export default function Notes() {
  const [notes, setNotes] = useState<Post[] | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("type", "==", "notes"),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        const data: any[] = [];

        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });

        setNotes(data);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!notes) {
    return <Loading title="Loading notes" />;
  }

  return (
    <>
      <Toaster />
      <main>
        {!notes?.length && (
          <Message type="warning">
            You have nothing on yout shopping list
          </Message>
        )}

        {notes.map((note) => (
          <Card key={note.id} post={note} />
        ))}
      </main>
    </>
  );
}
