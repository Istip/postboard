import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BellIcon, FileIcon, ListBulletIcon } from "@radix-ui/react-icons";

const footerMenu = [
  {
    title: "shopping",
    icon: <ListBulletIcon />,
    bagde: null,
  },
  {
    title: "notes",
    icon: <FileIcon />,
    bagde: null,
  },
  {
    title: "notifications",
    icon: <BellIcon />,
    bagde: 10,
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
                ? "text-yellow-500 border-b border-yellow-500 "
                : "text-white border-b border-transparent"
            } p-4 flex items-center justify-center rounded-t-md w-full`}
          >
            <div className="font-bold text-xs">{item.icon}</div>
            <div className="text-sm font-bold ml-2 hidden sm:block">
              {item.title.toUpperCase()}
            </div>
          </Link>
        );
      })}
    </>
  );
};
export default FooterMenu;
