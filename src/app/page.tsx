"use client";

import { Auth, Posts } from "@/components";
import { useAuthContext } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <main className="text-center">
      <div className="my-10 mb-16">
        {!user ? <Auth /> : "You are logged in"}
      </div>

      <Posts />
    </main>
  );
}
