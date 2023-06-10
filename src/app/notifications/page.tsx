"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useAuthContext } from "@/context/AuthContext";
import { NotificationType } from "@/interfaces/Notification";
import Loading from "@/components/Loading/Loading";
import Notification from "@/components/Notification/Notification";

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      // TODO: update where function to exclude your email
      // where("email", "!=", user?.email)

      query(collection(db, "notifications"), where("email", "!=", "shopping")),
      (snapshot) => {
        const data: any[] = [];

        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });

        setNotifications(data);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!notifications.length) {
    return <Loading title="Loading your notifications" />;
  }

  return (
    <div>
      {notifications.map((notification, i) => (
        <Notification key={i} notification={notification} />
      ))}
    </div>
  );
}
