import { Posts } from "@/components";

export default function Home() {
  return (
    <main className="w-full h-screen bg-slate-50">
      <div className="p-10">
        <h1 className="text-center font-semibold text-sm">This is App</h1>
      </div>
      <div className="text-center">
        <Posts />
      </div>
    </main>
  );
}
