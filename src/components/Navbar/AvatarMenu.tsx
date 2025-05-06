import { useRouter } from "next/navigation";
import { User, getAuth, signOut } from "firebase/auth";
import { ExitIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import Image from "next/image";

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
      <div className="flex items-center justify-center mb-2">
        <Image
          className="rounded-full border border-stone-950"
          src={user.photoURL ?? "/default_avatar.jpg"}
          width={64}
          height={64}
          alt={user.displayName ?? "User"}
        />
      </div>

      <div className="text-center text-stone-300 mb-3">
        <h3 className="text-xl">Hello,</h3>
        <h3 className="font-bold">{user!.displayName}</h3>
      </div>
      <div className="flex items-center">
        <button
          className="font-bold px-4 py-1 rounded-md bg-yellow-500 text-stone-950 hover:bg-yellow-600 transition-all"
          onClick={handleSignOut}
        >
          <div className="flex items-center font-light text-xs">
            <div className="mr-2">
              <ExitIcon />
            </div>
            Logout
          </div>
        </button>
      </div>
    </div>
  );
}
