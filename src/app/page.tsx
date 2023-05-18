"use client";

import { Auth } from "@/components";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

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

      <div>
        <Link href="auth" className="text-sky-500 underline font-bold">
          Go to auth »
        </Link>
      </div>
    </main>
  );
}
