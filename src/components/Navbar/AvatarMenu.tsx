import { useRouter } from "next/navigation";
import { User, getAuth, signOut } from "firebase/auth";
import { ExitIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

export default function AvatarMenu({ user }: { user: User }) {
  const router = useRouter();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        toast.error("Failed to sign out: ", e.message);
      });
  };

  return (
    <div className="relative mx-2 bg-stone-900 rounded-xl p-2 border  border-stone-800 shadow-xl shadow-stone-950/50">
      <div className="text-center text-stone-300 mb-4">
        <h3 className="text-2xl">Hello,</h3>
        <h3 className="font-bold">{user!.displayName}</h3>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="font-bold px-4 py-1 rounded-md bg-yellow-500 text-stone-950 hover:bg-yellow-600 transition-all"
          onClick={handleSignOut}
        >
          <div className="flex items-center">
            <div className="mr-2">
              <ExitIcon />
            </div>
            LOGOUT
          </div>
        </button>
      </div>
    </div>
  );
}
