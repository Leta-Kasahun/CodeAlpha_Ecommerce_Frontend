// src/components/layout/footer/FooterBottom.tsx
'use client';

export function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-800 mt-12 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Copyright */}
        <div className="text-gray-400 text-sm text-center md:text-left">
          © {currentYear} ShopSphere. All rights reserved.
        </div>
        
        {/* Credits */}
        <div className="text-gray-500 text-sm text-center">
          Built by Leta Kasahun • Powered by Code Alpha Internship
        </div>
        
        {/* Legal Links */}
        <div className="flex space-x-6 text-sm">
          <a href="/privacy" className="text-gray-400 hover:text-[#E6B84A] transition-colors">
            Privacy
          </a>
          <a href="/terms" className="text-gray-400 hover:text-[#E6B84A] transition-colors">
            Terms
          </a>
          <a href="/cookies" className="text-gray-400 hover:text-[#E6B84A] transition-colors">
            Cookies
          </a>
        </div>
      </div>
    </div>
  );
}