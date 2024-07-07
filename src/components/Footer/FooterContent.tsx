import { Cross2Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import MicrophoneIcon from "./MicrophoneIcon";
import FooterMenu from "./FooterMenu";
import useSwipe from "@/hooks/useSwipe";

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (e: React.FormEvent) => string | undefined;
  // eslint-disable-next-line no-unused-vars
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  text: string;
  // eslint-disable-next-line no-unused-vars
  setText: (text: string) => void;
  loading: boolean;
  startListening: () => void;
  stopListening: () => void;
  isListening: boolean;
  hasRecognition: boolean;
  // eslint-disable-next-line no-unused-vars
  setNotifications: (notifications: boolean) => void;
  notifications: boolean;
}

export default function FooterContent({
  handleSubmit,
  handleChange,
  text,
  setText,
  loading,
  startListening,
  stopListening,
  isListening,
  hasRecognition,
  setNotifications,
  notifications,
}: Props) {
  const submitPages = ["shopping", "notes"];
  const pathname = usePathname();
  const formattedPathname = pathname.substring(1, pathname.length);
  const pageIsSubmit = submitPages.includes(formattedPathname);

  const handleSwipeUp = () => setNotifications(true);
  const handleSwipeDown = () => setNotifications(false);

  useSwipe(handleSwipeUp, handleSwipeDown, 50);

  return (
    <div
      className={`w-full max-w-7xl flex flex-col sm:w-[450px] transition-shadow ${
        notifications ? "shadow-xl" : ""
      }`}
    >
      {pageIsSubmit && (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mb-2 h-10 flex gap-2 bg-stone-800 rounded-xl active:ring-[1px] active:ring-yellow-500"
        >
          <div className="relative w-full">
            {text.length ? (
              <button
                className="absolute top-2 right-2 p-1 bg-red-500/75 rounded-xl"
                onClick={() => setText("")}
              >
                <Cross2Icon />
              </button>
            ) : null}
            <textarea
              onChange={handleChange}
              value={text}
              disabled={loading}
              placeholder="Enter your text..."
              className="w-full h-full p-2 rounded-md bg-transparent focus:outline-none overflow-hidden
                    disabled:opacity-50 disabled:cursor-not-allowed resize-none text-sm placeholder:text-stone-50/30"
            />
          </div>
          <div className="flex items-center justify-center">
            {hasRecognition && (
              <button
                type="button"
                onTouchStart={startListening}
                onTouchEnd={stopListening}
                onClick={isListening ? stopListening : startListening}
                className="h-full text-red-500 rounded-md px-4 py-2 font-bold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MicrophoneIcon size="20" />
                <div className="text-sm hidden sm:block">Record</div>
                <span className="sr-only">Record</span>
              </button>
            )}
            <button
              disabled={isListening}
              className="h-full text-stone-50 rounded-md px-4 py-2 font-bold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperPlaneIcon />
              <div className="text-sm hidden sm:block">Create</div>
              <span className="sr-only">Create</span>
            </button>
          </div>
        </form>
      )}
      <div className="flex items-center rounded-md justify-between sm:justify-center gap-4 w-full pb-2">
        <FooterMenu />
      </div>
    </div>
  );
}
