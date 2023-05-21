import React from "react";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="px-4 pt-16 pb-36 container m-auto max-w-7xl lg:px-2">
      <div className="">{children}</div>
    </section>
  );
};
export default PageLayout;
