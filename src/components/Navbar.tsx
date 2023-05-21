"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { ExitIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="w-screen h-12 bg-slate-900 border-b border-slate-800 px-4 fixed flex justify-center">
      <div className="w-full max-w-7xl flex justify-between items-center gap-4">
        <div>
          <Link href="/" className="font-bold text-xs text-yellow-500">
            POSTBOARD
          </Link>
        </div>
        <div>
          {user && (
            <div className="flex items-center gap-4">
              <button
                className="text-xs font-bold px-4 py-2 rounded-md bg-yellow-500 text-slate-950 hover:bg-yellow-600 transition-all"
                onClick={handleSignOut}
              >
                <div className="flex items-center">
                  <div className="mr-2">
                    <ExitIcon />
                  </div>
                  LOGOUT
                </div>
              </button>
              <div className="border rounded-full border-yellow-500">
                <Image
                  className="rounded-full text-xs border border-white"
                  src={user.photoURL ?? "/default_avatar.bmp"}
                  width={32}
                  height={32}
                  alt={user.displayName ?? "User"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
