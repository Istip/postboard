import { AuthContextProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PostBoard",
  description: "Post your toughts!",
  manifest: "/manifest.json",
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <div className="bg-slate-950 text-slate-50 w-full min-h-screen h-auto">
            <Navbar />
            <div className="px-4 pt-16 pb-36">{children}</div>
            <Footer />
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
