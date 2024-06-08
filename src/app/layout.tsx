import { Figtree } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import { Metadata, Viewport } from "next";

const font = Figtree({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PostBoard",
  description: "Post your toughts!",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1C1917",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={font.className}>
        <AuthContextProvider>
          <div className="bg-stone-950 text-stone-50 w-full min-h-screen h-auto">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
