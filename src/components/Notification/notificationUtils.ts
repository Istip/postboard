import { NotificationType } from "@/interfaces/Notification";

export const borderColor = (notification: NotificationType) =>
  notification.type === "notes"
    ? "border-yellow-500"
    : notification.type === "shopping"
    ? "border-green-500"
    : notification.type === "comment"
    ? "border-zinc-500"
    : "";
