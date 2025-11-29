'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const categories = [
  { name: 'Clothing', href: '/products/clothing' },
  { name: 'Shoes', href: '/products/shoes' },
  { name: 'Bags', href: '/products/bags' },
  { name: 'Accessory', href: '/products/accessory' }
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-full bg-white z-50">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">ShopSphere</h2>
            <button onClick={onClose} className="p-2 hover:text-[#5156D2] transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-0">
          <button 
            onClick={() => handleNavigation('/')} 
            className="w-full text-left py-4 text-lg font-semibold border-b border-gray-100 hover:text-[#5156D2] hover:bg-gray-50 transition-colors duration-200"
          >
            Home
          </button>
          
          {categories.map((category) => (
            <button 
              key={category.name}
              onClick={() => handleNavigation(category.href)} 
              className="w-full text-left py-4 text-lg font-semibold border-b border-gray-100 hover:text-[#5156D2] hover:bg-gray-50 transition-colors duration-200"
            >
              {category.name}
            </button>
          ))}
          
          <button 
            onClick={() => handleNavigation('/about')} 
            className="w-full text-left py-4 text-lg font-semibold border-b border-gray-100 hover:text-[#5156D2] hover:bg-gray-50 transition-colors duration-200"
          >
            About
          </button>
          <button 
            onClick={() => handleNavigation('/contact')} 
            className="w-full text-left py-4 text-lg font-semibold hover:text-[#5156D2] hover:bg-gray-50 transition-colors duration-200"
          >
            Contact
          </button>
        </nav>
      </div>
    </div>
  );
}