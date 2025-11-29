import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/src/components/layout/footer/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono", 
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "ShopSphere | Premium Fashion Store",
    template: "%s | ShopSphere",
  },
  description: "Discover premium fashion, accessories, and lifestyle products crafted for modern elegance.",
  keywords: ["fashion", "ecommerce", "premium clothing", "lifestyle accessories"],
  authors: [{ name: "ShopSphere Development Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://shopsphere.com"),
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <div className="relative flex min-h-screen flex-col">
          {/* <Header /> */}
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}