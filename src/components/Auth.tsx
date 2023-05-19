"use client";

import signUp from "@/utils/signUp";

export default function Auth() {
  return (
    <div className="text-center">
      <br />
      <h1 className="text-xs">Please authenticate to continue:</h1>

      <button
        className="m-2 px-4 py-2 bg-sky-500 text-white text-sm font-bold rounded-md"
        onClick={() => signUp()}
      >
        CONTINUE WITH GOOGLE
      </button>
    </div>
  );
}
