"use client";

import { useAuthContext } from "@/context/AuthContext";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function Footer() {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <div className="w-screen bg-slate-900 border-slate-800 border-t fixed bottom-0">
      <div className="px-4 py-2 h-16 flex gap-2">
        <textarea
          placeholder="Enter your text..."
          className="w-full h-full bg-slate-800 p-2 rounded-md border-transparent border focus:outline-none focus:border focus:border-slate-800 resize-none text-sm"
        />
        <button className="h-full bg-yellow-500 rounded-md px-4 py-2 text-slate-950 font-bold">
          <PlusCircledIcon />
        </button>
      </div>
      <div className="px-4 flex justify-center">
        <div className="max-w-7xl flex justify-between items-center gap-4 w-96 py-4">
          <button className="font-bold text-xs bg-yellow-500 px-4 py-2 rounded-md text-slate-950">
            SHOPPING
          </button>
          <button className="font-bold text-xs text-yellow-500">NOTES</button>
          <button className="font-bold text-xs text-yellow-500">
            NOTIFICATIONS
          </button>
        </div>
      </div>
    </div>
  );
}
