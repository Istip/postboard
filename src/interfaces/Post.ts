export type Post = {
  text: string;
  createdAt: Date;
  type: string;
  marked: boolean;
  id?: string;
  done?: boolean;
  displayName: string | undefined | null;
  email: string | undefined | null;
  photoUrl: string | undefined | null;
};
