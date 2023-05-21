import PageLayout from "@/components/PageLayout/PageLayout";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout>{children}</PageLayout>;
}
