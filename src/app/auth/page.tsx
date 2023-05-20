"use client";

import { useAuthContext } from "@/context/AuthContext";
import signUp from "@/utils/signUp";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Auth() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="text-center">
      <h1 className="text-yellow-500 font-bold text-2xl mb-4">POSTBOARD</h1>
      <p className="text-sm mb-4">Please authenticate to continue</p>
      <button
        className="m-2 px-4 py-2 bg-yellow-500 text-slate-800 text-xs font-bold rounded-md"
        onClick={() => signUp()}
      >
        CONTINUE WITH GOOGLE
      </button>
    </div>
  );
}

export default Auth;
