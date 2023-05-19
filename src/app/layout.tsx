import { AuthContextProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <div className="bg-slate-950 text-slate-50 w-full min-h-screen h-auto">
          <AuthContextProvider>
            <Navbar />
            <div className="py-16 px-4">{children}</div>
            <Footer />
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
