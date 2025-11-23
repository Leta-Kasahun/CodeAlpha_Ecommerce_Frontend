// src/components/layout/MobileMenu.tsx
'use client';

import { X, Shirt, ShoppingBag, Footprints, Watch } from 'lucide-react';
import { useCategories } from '@/src/hooks/useCategories';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconComponents = {
  Shirt: Shirt,
  ShoppingBag: ShoppingBag, 
  Footprints: Footprints,
  Watch: Watch,
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { categories, handleCategoryClick } = useCategories();

  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-xl z-50 transform transition-transform">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">ShopSphere</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="p-6 space-y-6">
          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Categories</h3>
            {categories.map((category) => {
              const IconComponent = iconComponents[category.icon as keyof typeof iconComponents];
              
              return (
                <div key={category.id} className="space-y-2">
                  <button
                    onClick={() => {
                      handleCategoryClick(category.id);
                      onClose();
                    }}
                    className="flex items-center space-x-3 w-full py-3 text-gray-700 hover:text-[#5156D2] transition-colors border-b border-gray-100"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                  
                  {/* Subcategories */}
                  {category.subcategories?.map((subcategory) => (
                    <button
                      key={subcategory}
                      onClick={() => {
                        handleCategoryClick(category.id, subcategory);
                        onClose();
                      }}
                      className="block w-full text-left py-2 pl-8 text-gray-600 hover:text-[#5156D2] transition-colors text-sm capitalize"
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Additional Links */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <button className="block w-full text-left py-2 text-gray-700 hover:text-[#5156D2] transition-colors">
              About Us
            </button>
            <button className="block w-full text-left py-2 text-gray-700 hover:text-[#5156D2] transition-colors">
              Contact
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}