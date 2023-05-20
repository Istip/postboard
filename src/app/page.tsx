"use client";

import { Posts } from "@/components";
import { useAuthContext } from "@/context/AuthContext";
import signUp from "@/utils/signUp";
import Link from "next/link";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <main className="text-center">
      {user ? (
        <Posts />
      ) : (
        <div className="text-center">
          <h1 className="text-yellow-500 font-bold text-2xl mb-4">POSTBOARD</h1>
          <p className="text-sm mb-4">Please authenticate to continue</p>

          <Link
            href="/auth"
            className="text-sky-500 text-sm font-bold underline"
          >
            Go to auth »
          </Link>
        </div>
      )}
    </main>
  );
}
