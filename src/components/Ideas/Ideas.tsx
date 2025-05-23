import * as Dialog from "@radix-ui/react-dialog";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import IdeasContent from "./IdeasContent";

const Ideas = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="bg-yellow-500 w-[50px] h-[50px] rounded-xl flex items-center justify-center cursor-pointer">
          <LightningBoltIcon className="text-stone-950" />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-[1000]" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-stone-900 text-stone-50 rounded-lg z-[1000] w-[80%] h-[80%] flex items-center justify-center border-stone-200 outline-0">
          <Dialog.Description className="sr-only">
            Here are some ideas to add to your shopping list
          </Dialog.Description>
          <Dialog.Title className="sr-only">Ideas</Dialog.Title>
          <IdeasContent />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Ideas;
