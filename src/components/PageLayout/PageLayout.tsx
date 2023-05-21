import React from "react";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <section className="px-4 pt-16 pb-36">{children}</section>;
};
export default PageLayout;
