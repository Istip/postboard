import { AuthContextProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PostBoard",
  description: "Post your toughts!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <AuthContextProvider>{children}</AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
