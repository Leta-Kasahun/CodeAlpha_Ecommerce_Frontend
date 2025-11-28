// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/src/components/layout/nav/Header";
import { Footer } from "@/src/components/layout/footer/Footer";

// ====== Load Premium Modern Fonts (Geist Sans + Mono) ======
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

// ====== SEO Metadata ======
export const metadata: Metadata = {
  title: {
    default: "ShopSphere | Premium Fashion Store",
    template: "%s | ShopSphere",
  },
  description:
    "Discover premium fashion, accessories, and lifestyle products crafted for modern elegance.",
  keywords: [
    "fashion",
    "ecommerce",
    "shop online",
    "ShopSphere",
    "premium clothing",
    "lifestyle accessories",
  ],
  authors: [{ name: "ShopSphere Development Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

// ====== Root Layout Component ======
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white text-neutral-900">
        <Header />

        <main className="min-h-[70vh] w-full">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
