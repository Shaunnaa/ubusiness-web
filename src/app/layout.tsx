import type { Metadata } from "next";
import { Playfair_Display, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-thai",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "APL Accountancy | U Business Adviser",
  description: "Strategic Partner for Profitable Growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${playfair.variable} ${notoThai.variable} font-thai bg-white dark:bg-brand-dark text-gray-900 dark:text-gray-100 transition-colors duration-300 antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
