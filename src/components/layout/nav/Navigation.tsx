// src/components/layout/Navigation.tsx
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { Shirt, ShoppingBag, Footprints, Watch } from 'lucide-react';
import { useCategories } from '@/src/hooks/useCategories';

const iconComponents = {
  Shirt: Shirt,
  ShoppingBag: ShoppingBag,
  Footprints: Footprints,
  Watch: Watch,
};

export function Navigation() {
  const { categories, handleCategoryClick } = useCategories();

  return (
    <nav className="flex items-center space-x-1">
      {categories.map((category) => {
        const IconComponent = iconComponents[category.icon as keyof typeof iconComponents];
        
        return category.subcategories ? (
          <DropdownMenu key={category.id}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-[#5156D2] font-medium transition-colors duration-200 group">
                <IconComponent className="h-4 w-4" />
                <span>{category.name}</span>
                <svg className="h-4 w-4 transform group-hover:rotate-180 transition-transform" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              {category.subcategories.map((subcategory) => (
                <DropdownMenuItem
                  key={subcategory}
                  onClick={() => handleCategoryClick(category.id, subcategory)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#5156D2] cursor-pointer capitalize"
                >
                  <span>{subcategory}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-[#5156D2] font-medium transition-colors duration-200"
          >
            <IconComponent className="h-4 w-4" />
            <span>{category.name}</span>
          </button>
        );
      })}
      
      {/* About & Contact Links */}
      <button className="px-4 py-2 text-gray-700 hover:text-[#5156D2] font-medium transition-colors duration-200">
        About
      </button>
      <button className="px-4 py-2 text-gray-700 hover:text-[#5156D2] font-medium transition-colors duration-200">
        Contact
      </button>
    </nav>
  );
}