import { Poppins } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

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
      <body className={poppins.className}>
        <AuthContextProvider>
          <div className="bg-slate-950 text-slate-50 w-full min-h-screen h-auto">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
