import React from "react";
import styles from "./loading.module.css";

const Loading: React.FC<{ text?: boolean; title?: string }> = ({
  text = true,
  title = "Loading",
}) => {
  const WrapperText: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    if (!text) {
      return <>{children}</>;
    }

    return (
      <>
        <div className="text-amber-500 font-bold text-sm">{title}</div>
        <div className="text-amber-500 font-bold text-2xl">POSTBOARD</div>
        {children}
      </>
    );
  };

  const Spinner = () => {
    return (
      <div className="py-[35px]">
        <div className={styles.loading} />
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden flex flex-wrap flex-col items-center justify-center">
      <WrapperText>
        <Spinner />
      </WrapperText>
    </div>
  );
};

export default Loading;
