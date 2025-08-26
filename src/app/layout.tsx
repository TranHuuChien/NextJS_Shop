import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import GlobalProvider from "@/components/Application/GlobalProvider";

const inter = Inter({ weight: ['400', '500', '600', '700', '800'], subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "Chien Tran E-Commerce",
  description: "A complete e-commerce application with Next.js and Wix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        <GlobalProvider>
            {children}
        </GlobalProvider>
        
        {/* <Footer /> */}
      </body>
    </html>
  );
}
