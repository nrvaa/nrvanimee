import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArchiveProvider } from "@/providers/ArchiveProvider";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "NRVANIMELIST",
  description: "Objective anime tracking and discovery.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col swiss-noise bg-white text-black selection:bg-swiss-red selection:text-[#fff]" suppressHydrationWarning={true}>
        <SmoothScrollProvider>
          <ArchiveProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </ArchiveProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
