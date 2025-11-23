// src/components/layout/Footer.tsx
'use client';

import { LeftSection } from "./LeftSection";
import { RightSection } from "./RightSection";
import { FooterBottom } from "./FooterBottom";


export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Brand & Newsletter */}
          <LeftSection />
          
          {/* Right Section - Quick Links */}
          <RightSection />
        </div>
        
        {/* Bottom Bar */}
        <FooterBottom />
      </div>
    </footer>
  );
}