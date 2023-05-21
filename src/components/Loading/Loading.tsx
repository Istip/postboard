import React from "react";
import styles from "./loading.module.css";

const Loading: React.FC<{ text?: boolean }> = ({ text = true }) => {
  const WrapperText: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    if (!text) {
      return <>{children}</>;
    }

    return (
      <>
        <div className="text-yellow-500 font-bold text-sm">Loading</div>
        <div className="text-yellow-500 font-bold text-2xl">POSTBOARD</div>
        {children}
      </>
    );
  };

  const Spinner = () => {
    return (
      <div className="p-10">
        <div className={styles.loading} />
      </div>
    );
  };

  return (
    <div className="w-100 overflow-hidden flex flex-wrap flex-col items-center justify-center">
      <WrapperText>
        <Spinner />
      </WrapperText>
    </div>
  );
};

export default Loading;
