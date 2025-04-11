"use client";

import { usePathname } from "next/navigation";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const paddingBottom = pathname === "/notifications" ? "pb-20" : "pb-40";

  return (
    <section
      className={`px-4 pt-16 ${paddingBottom} container m-auto max-w-7xl lg:px-2`}
    >
      <div className="">{children}</div>
    </section>
  );
};
export default PageLayout;
