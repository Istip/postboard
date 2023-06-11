export interface NotificationType {
  id?: string;
  text: string;
  createdAt: any;
  type: string;
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoUrl: string | null | undefined;
  seen: boolean;
  post?: string;
}
