import { AuthContextProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <div className="bg-slate-900 text-slate-50 w-full h-screen">
          <AuthContextProvider>
            <Navbar />
            <div className="pt-12">{children}</div>
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
