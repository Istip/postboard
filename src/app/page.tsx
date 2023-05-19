"use client";

import { Auth, Posts } from "@/components";
import { useAuthContext } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <main className="w-full h-screen bg-slate-50 text-center">
      <div className="p-10">
        <h1 className="font-semibold text-sm">This is App</h1>
      </div>

      <div className="my-10 mb-16">
        {!user ? <Auth /> : "You are logged in"}
      </div>

      <Posts />
    </main>
  );
}
