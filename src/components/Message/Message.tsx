const Message: React.FC<{
  children: React.ReactNode;
  type?: "warning" | "error" | "success";
}> = ({ children, type = "success" }) => {
  const tokens = {
    warning: {
      bg: "bg-amber-200",
      border: "border-amber-500",
      text: "text-amber-900",
    },
    error: {
      bg: "bg-red-300",
      border: "border-red-500",
      text: "text-red-900",
    },
    success: {
      bg: "bg-green-300",
      border: "border-green-500",
      text: "text-green-900",
    },
  };

  return (
    <div
      className={`w-full rounded-md text-center font-semibold text-sm p-4 border text-opacity-75 ${tokens[type].text} ${tokens[type].bg} ${tokens[type].border}`}
    >
      {children}
    </div>
  );
};
export default Message;
