import PageLayout from "@/components/PageLayout/PageLayout";

export default function ShoppingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout>{children}</PageLayout>;
}
