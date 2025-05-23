import { useAuthContext } from "@/context/AuthContext";
import { Post } from "@/interfaces/Post";
import { capitalizeFirstLetter } from "@/utils/common";
import { db } from "@/utils/firebase";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  category: string;
  items: string[];
  setFrequent: React.Dispatch<React.SetStateAction<any>>;
  frequent: any;
}

const ChevronIcon = ({ open }: { open: boolean }) => {
  return open ? (
    <ChevronUpIcon className="text-stone-950" />
  ) : (
    <ChevronDownIcon className="text-stone-950" />
  );
};

const Group = ({ category, items, setFrequent, frequent }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const { user } = useAuthContext();

  const handleAddItem = async (item: string) => {
    setLoading(item);
    let toastID = toast.loading("Adding item to shopping list...");

    const data: Post = {
      text: item,
      createdAt: new Date(),
      type: "shopping",
      marked: false,
      done: false,
      displayName: user?.displayName,
      email: user?.email,
      photoUrl: user?.photoURL,
    };

    try {
      await addDoc(collection(db, "posts"), data);
      await addDoc(collection(db, "notifications"), {
        text: item,
        createdAt: new Date(),
        type: "shopping",
        displayName: user?.displayName,
        email: user?.email,
        photoUrl: user?.photoURL,
        seen: false,
      });

      setFrequent((prev: any) => ({
        ...prev,
        [category]: prev[category].filter((i: string) => i !== item),
      }));

      toast.success(
        () => (
          <div>
            <span className="font-bold text-md">{item}</span>{" "}
            <span className="opacity-75">added to the shopping list!</span>
          </div>
        ),
        { id: toastID }
      );
    } catch (error) {
      toast.error("Please try again!", { id: toastID });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div key={category} className="flex flex-col gap-2 mb-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-sm">{capitalizeFirstLetter(category)}</h2>
        <button className="bg-yellow-500 p-2 rounded-full cursor-pointer flex items-center justify-center">
          <ChevronIcon open={open} />
        </button>
      </div>
      {open && (
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {[...items].sort().map((item, index) => (
            <button
              onClick={() => handleAddItem(item)}
              key={index}
              className="bg-stone-800 px-4 py-4 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[12px]"
              disabled={loading === item}
            >
              <li>{capitalizeFirstLetter(item)}</li>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Group;
