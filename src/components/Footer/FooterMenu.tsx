import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BellIcon, FileIcon, ListBulletIcon } from "@radix-ui/react-icons";

const footerMenu = [
  {
    title: "shopping",
    icon: <ListBulletIcon />,
  },
  {
    title: "notes",
    icon: <FileIcon />,
  },
  {
    title: "notifications",
    icon: <BellIcon />,
  },
];

const FooterMenu = () => {
  const [current, setCurrent] = useState("/shopping");

  const pathname = usePathname();

  return (
    <>
      {footerMenu.map((item) => {
        return (
          <Link
            onClick={() => current !== item.title && setCurrent(item.title)}
            href={item.title}
            key={item.title}
            className={`${
              pathname === `/${item.title}`
                ? "border border-yellow-500 text-yellow-500"
                : "text-white border-b border-transparent"
            } p-4 flex items-center justify-center rounded-md w-full`}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <div className="font-bold text-xs">{item.icon}</div>
            <div className="text-sm font-bold ml-2 hidden sm:block">
              {item.title.toUpperCase()}
            </div>
            <span className="sr-only">{item.title.toUpperCase()}</span>
          </Link>
        );
      })}
    </>
  );
};
export default FooterMenu;
