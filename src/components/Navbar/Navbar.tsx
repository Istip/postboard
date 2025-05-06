"use client";

import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import Logo from "./Logo";
import AvatarMenu from "./AvatarMenu";
import * as Popover from "@radix-ui/react-popover";
import { DashboardIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <nav className="w-screen h-12 bg-stone-900 border-b border-stone-800 px-4 fixed z-10 flex justify-center">
      <div className="w-full max-w-7xl flex justify-between items-center gap-4">
        <div>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="font-black text-lg text-yellow-500">POSTBOARD</div>
        <div className="-mb-[7px]">
          {user && (
            <Popover.Root>
              <Popover.Trigger>
                <DashboardIcon className="text-yellow-500 hover:cursor-pointer" />
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content sideOffset={16}>
                  <AvatarMenu user={user} />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          )}
        </div>
      </div>
    </nav>
  );
}
