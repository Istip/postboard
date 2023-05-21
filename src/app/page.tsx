"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import signUp from "@/utils/signUp";
import Loading from "@/components/Loading/Loading";
import { EnterIcon } from "@radix-ui/react-icons";

export default function Home() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/shopping");
    }
  }, [user, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="text-center">
      {!user && (
        <div className="text-center">
          <h1 className="text-yellow-500 font-bold text-2xl mb-4">POSTBOARD</h1>
          <p className="text-sm mb-4">Please authenticate to continue</p>

          <button
            className="m-2 px-4 py-2 bg-yellow-500 text-slate-800 text-xs font-bold rounded-md hover:bg-yellow-600 transition-all"
            onClick={() => signUp()}
          >
            <div className="flex items-center">
              <div className="mr-2">
                <EnterIcon />
              </div>
              <div>CONTINUE WITH GOOGLE</div>
            </div>
          </button>
        </div>
      )}
    </main>
  );
}
