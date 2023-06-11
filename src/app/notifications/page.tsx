"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NotificationType } from "@/interfaces/Notification";
import Loading from "@/components/Loading/Loading";
import Notification from "@/components/Notification/Notification";
import Toaster from "@/components/Toaster/Toaster";
import Message from "@/components/Message/Message";

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "notifications")),
      (snapshot) => {
        const data: any[] = [];

        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });

        setNotifications(data);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading title="Loading your notifications" />;
  }

  if (!notifications.length) {
    return <Message type="warning">You have no notifications!</Message>;
  }

  return (
    <>
      <Toaster />
      {notifications
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
        .map((notification, i) => (
          <Notification key={i} notification={notification} />
        ))}
    </>
  );
}
