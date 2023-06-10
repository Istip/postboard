export interface NotificationType {
  text: string;
  createdAt: Date;
  type: string;
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoUrl: string | null | undefined;
  seen: boolean;
  post?: string;
}
