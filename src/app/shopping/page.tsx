"use client";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import {
  CalendarIcon,
  TrashIcon,
  CheckCircledIcon,
  PaperPlaneIcon,
  DragHandleHorizontalIcon,
} from "@radix-ui/react-icons";

export default function Shopping() {
  const { user } = useAuthContext();

  return (
    <main>
      <div className="mb-4 text-slate-200">
        <div className="w-full p-2 bg-slate-900 flex gap-2 justify-between items-center rounded-t-md hover:bg-opacity-70 transition-all border-b-slate-950 border-b cursor-grab">
          <div className="rounded-full bg-slate-950 border border-yellow-500">
            <Image
              src={user?.photoURL || "/default_avatar.bmp"}
              className="w-6 h-6 border rounded-full bg-slate-950 border-white"
              width={24}
              height={24}
              alt={user?.displayName || ""}
            />
          </div>
          <div className="text-slate-600 font-bold text-sm">Pasztor Isti</div>
        </div>

        <div className="bg-slate-900 p-4 text-sm">
          <div className="uppercase text-lg font-medium">Cherry paradicsom</div>

          <div className="bg-slate-800 bg-opacity-30 p-4 mt-4 rounded-md text-xs">
            <div className="text-xs font-bold text-slate-500">Comments:</div>

            <div className=" text-slate-300" style={{ fontSize: 10 }}>
              <div className="flex gap-4 mt-4">
                <Image
                  src={user?.photoURL || "/default_avatar.bmp"}
                  className="w-4 h-4 border rounded-full bg-slate-950 border-white"
                  width={24}
                  height={24}
                  alt={user?.displayName || ""}
                />

                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  cumque tenetur quia incidunt vel dolores aliquam id excepturi
                  facere, perspiciatis earum porro inventore nam. Quia iure esse
                  autem cumque molestiae.
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <Image
                  src={user?.photoURL || "/default_avatar.bmp"}
                  className="w-4 h-4 border rounded-full bg-slate-950 border-white"
                  width={24}
                  height={24}
                  alt={user?.displayName || ""}
                />

                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda sequi nulla nihil!
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4 items-center">
              <Image
                src={user?.photoURL || "/default_avatar.bmp"}
                className="w-4 h-4 border rounded-full bg-slate-950 border-white"
                width={24}
                height={24}
                alt={user?.displayName || ""}
              />

              <div className="w-full flex gap-2">
                <input
                  type="text"
                  placeholder="Leave a comment..."
                  className="text-xs w-full bg-slate-900 rounded-md px-2 border-transparent border focus:outline-none focus:border focus:border-slate-950"
                />
                <button className="px-4 py-1 bg-yellow-500 text-slate-900 font-bold rounded-md flex items-center gap-1">
                  <div>
                    <PaperPlaneIcon />
                  </div>
                  <p className="uppercase">POST</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-2 bg-slate-900 flex gap-2 justify-between items-center rounded-b-md border-t-slate-950 border-t">
          <div className="w-full flex items-center justify-between">
            <div className="text-xs flex gap-2 text-slate-500">
              <CalendarIcon /> <p>2023.05.21</p>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-500 rounded-md">
                <TrashIcon />
              </button>
              <button className="px-4 py-2 bg-green-600 rounded-md">
                <CheckCircledIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 text-slate-200">
        <div className="w-full p-2 bg-slate-900 flex gap-2 justify-between items-center rounded-t-md hover:bg-opacity-70 transition-all border-b-slate-950 border-b cursor-grab">
          <div className="rounded-full bg-slate-950 border border-yellow-500">
            <Image
              src={user?.photoURL || "/default_avatar.bmp"}
              className="w-6 h-6 border rounded-full bg-slate-950 border-white"
              width={24}
              height={24}
              alt={user?.displayName || ""}
            />
          </div>
          <div className="text-slate-600 font-bold text-sm">Pasztor Isti</div>
        </div>

        <div className="bg-slate-900 p-4 text-sm">
          <div className="uppercase text-lg font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </div>

          <div className="bg-slate-800 bg-opacity-30 p-4 mt-4 rounded-md text-xs">
            <div className="flex gap-4 items-center">
              <Image
                src={user?.photoURL || "/default_avatar.bmp"}
                className="w-4 h-4 border rounded-full bg-slate-950 border-white"
                width={24}
                height={24}
                alt={user?.displayName || ""}
              />

              <div className="w-full flex gap-2">
                <input
                  type="text"
                  placeholder="Leave a comment..."
                  className="text-xs w-full bg-slate-900 rounded-md px-2 border-transparent border focus:outline-none focus:border focus:border-slate-950"
                />
                <button className="px-4 py-1 bg-yellow-500 text-slate-900 font-bold rounded-md flex items-center gap-1">
                  <div>
                    <PaperPlaneIcon />
                  </div>
                  <p className="uppercase">POST</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-2 bg-slate-900 flex gap-2 justify-between items-center rounded-b-md border-t-slate-950 border-t">
          <div className="w-full flex items-center justify-between">
            <div className="text-xs flex gap-2 text-slate-500">
              <CalendarIcon /> <p>2023.05.21</p>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-500 rounded-md">
                <TrashIcon />
              </button>
              <button className="px-4 py-2 bg-green-600 rounded-md">
                <CheckCircledIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 text-slate-200 opacity-40">
        <div className="w-full p-2 bg-slate-900 flex gap-2 justify-between items-center rounded-t-md hover:bg-opacity-70 transition-all">
          <div className="rounded-full bg-slate-950 border border-yellow-500">
            <Image
              src={user?.photoURL || "/default_avatar.bmp"}
              className="w-6 h-6 border rounded-full bg-slate-950 border-white"
              width={24}
              height={24}
              alt={user?.displayName || ""}
            />
          </div>
          <div className="text-slate-600 font-bold text-sm">Pasztor Isti</div>
        </div>

        <div className="w-full p-2 bg-slate-900 flex gap-2 justify-between items-center rounded-b-md border-t-slate-950 border-t">
          <div className="w-full flex items-center justify-between">
            <div className="text-xs flex gap-2 text-slate-500">
              <CalendarIcon /> <p>2023.05.21</p>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-500 rounded-md">
                <TrashIcon />
              </button>
              <button className="px-4 py-2 bg-green-600 rounded-md">
                <CheckCircledIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 text-slate-200">
        <div className="w-full p-2 bg-slate-900 flex gap-2 justify-between items-center rounded-t-md hover:bg-opacity-70 transition-all border-b-slate-950 border-b cursor-grab">
          <div className="rounded-full bg-slate-950 border border-yellow-500">
            <Image
              src={user?.photoURL || "/default_avatar.bmp"}
              className="w-6 h-6 border rounded-full bg-slate-950 border-white"
              width={24}
              height={24}
              alt={user?.displayName || ""}
            />
          </div>
          <div className="text-slate-600 font-bold text-sm">Pasztor Isti</div>
        </div>

        <div className="bg-slate-900 p-4 text-sm">
          <div className="uppercase text-lg font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </div>

          <div className="bg-slate-800 bg-opacity-30 p-4 mt-4 rounded-md text-xs">
            <div className="flex gap-4 items-center">
              <Image
                src={user?.photoURL || "/default_avatar.bmp"}
                className="w-4 h-4 border rounded-full bg-slate-950 border-white"
                width={24}
                height={24}
                alt={user?.displayName || ""}
              />

              <div className="w-full flex gap-2">
                <input
                  type="text"
                  placeholder="Leave a comment..."
                  className="text-xs w-full bg-slate-900 rounded-md px-2 border-transparent border focus:outline-none focus:border focus:border-slate-950"
                />
                <button className="px-4 py-1 bg-yellow-500 text-slate-900 font-bold rounded-md flex items-center gap-1">
                  <div>
                    <PaperPlaneIcon />
                  </div>
                  <p className="uppercase">POST</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-2 bg-slate-900 flex gap-2 justify-between items-center rounded-b-md border-t-slate-950 border-t">
          <div className="w-full flex items-center justify-between">
            <div className="text-xs flex gap-2 text-slate-500">
              <CalendarIcon /> <p>2023.05.21</p>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-500 rounded-md">
                <TrashIcon />
              </button>
              <button className="px-4 py-2 bg-green-600 rounded-md">
                <CheckCircledIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
