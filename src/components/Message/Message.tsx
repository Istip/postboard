import {
  CheckCircledIcon,
  CrossCircledIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

const Message: React.FC<{
  children: React.ReactNode;
  type?: "warning" | "error" | "success";
}> = ({ children, type = "success" }) => {
  const tokens = {
    warning: {
      bg: "bg-stone-800",
      border: "border-stone-700",
      text: "text-stone-300",
      icon: <InfoCircledIcon />,
    },
    error: {
      bg: "bg-red-300",
      border: "border-red-500",
      text: "text-red-900",
      icon: <CrossCircledIcon />,
    },
    success: {
      bg: "bg-green-300",
      border: "border-green-500",
      text: "text-green-900",
      icon: <CheckCircledIcon />,
    },
  };

  return (
    <div
      className={`w-full rounded-xl flex font-semibold text-sm p-4 border text-opacity-75 ${tokens[type].text} ${tokens[type].bg} ${tokens[type].border}`}
    >
      <div className="pr-4 pt-[3px] animate-pulse">{tokens[type].icon}</div>
      <div className="w-full">{children}</div>
    </div>
  );
};
export default Message;
