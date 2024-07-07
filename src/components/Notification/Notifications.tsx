"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import {
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { NotificationType } from "@/interfaces/Notification";
import Loading from "@/components/Loading/Loading";
import Notification from "@/components/Notification/Notification";
import Toaster from "@/components/Toaster/Toaster";
import Message from "@/components/Message/Message";
import { toast } from "react-hot-toast";

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

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

  const removeNotificationsCollection = async () => {
    try {
      // Get a reference to the 'notifications' collection
      const notificationsRef = collection(db, "notifications");

      // Get all the documents from the 'notifications' collection
      const querySnapshot = await getDocs(notificationsRef);

      // Delete each document one by one
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      toast.error("Error clearing notifications, please try again!");
    }
  };

  if (!user) {
    return <Loading title="Redirecting" />;
  }

  if (loading) {
    return <Loading title="Loading your notifications" />;
  }

  if (!notifications.length) {
    return <Message type="warning">You have no new notifications!</Message>;
  }

  return (
    <div className="h-[200px] pt-2">
      <Toaster />
      <div className="w-full mb-2">
        <button
          className="w-full bg-red-600 border border-red-500 hover:bg-red-500 transition-all text-sm font-bold p-1 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
          onClick={removeNotificationsCollection}
        >
          Remove notifications
        </button>
      </div>
      <AnimatePresence>
        {notifications
          .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          .map((notification, i) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div key={i} className="py-0.5">
                <Notification notification={notification} />
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
