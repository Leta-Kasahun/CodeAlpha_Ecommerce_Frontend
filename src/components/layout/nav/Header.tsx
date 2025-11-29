'use client';

import { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import SearchBar from './SearchBar';
import { UserActions } from './UserActions';
import { MobileMenu } from './mobileMenu';
import { Logo } from './Logo';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg backdrop-blur-md bg-white/95' : 'shadow-sm'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo + Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:gap-16 flex-1 lg:flex-none">
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-3 rounded-lg text-gray-700 hover:text-[#5156D2] hover:bg-gray-50 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <Logo />
            <div className="hidden lg:block">
              <Navigation />
            </div>
          </div>

          {/* Search Bar - Always visible but layout changes */}
          <div className={`${isMobileSearchVisible ? 'flex absolute top-16 left-0 right-0 bg-white p-4 border-b border-gray-200' : 'hidden md:flex'} flex-1 max-w-2xl mx-4 lg:mx-8`}>
            <SearchBar />
            {isMobileSearchVisible && (
              <button 
                onClick={() => setIsMobileSearchVisible(false)}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700"
              >
                <XIcon />
              </button>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center justify-end gap-2 lg:gap-6 flex-1 lg:flex-none">
            <UserActions onMobileSearchToggle={() => setIsMobileSearchVisible(!isMobileSearchVisible)} />
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}