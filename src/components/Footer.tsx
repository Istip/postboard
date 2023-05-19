export default function Footer() {
  return (
    <div className="w-screen h-12 bg-slate-900 border-t border-slate-800 px-4 fixed flex justify-center bottom-0">
      <div className="w-full max-w-7xl flex justify-between items-center gap-4">
        <button className="font-bold text-xs bg-yellow-500 px-4 py-2 rounded-md text-slate-950">
          SHOPPING
        </button>
        <button className="font-bold text-xs text-yellow-500">NOTES</button>
        <button className="font-bold text-xs text-yellow-500">
          NOTIFICATIONS
        </button>
      </div>
    </div>
  );
}
